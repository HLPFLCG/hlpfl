import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import { ValidationError, NotFoundError } from '../utils/errors';
import { authMiddleware } from '../middleware/auth';
import { JWTService } from '../utils/jwt';

export function createAnalyticsRoutes(db: DatabaseService, jwtService: JWTService) {
  const analytics = new Hono();

  // All routes require authentication
  analytics.use('*', authMiddleware(jwtService));

  /**
   * GET /analytics/overview
   * Get analytics overview for user
   */
  analytics.get('/overview', async (c) => {
    const user = c.get('user');
    const days = parseInt(c.req.query('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get total posts
    const postStats = await db.queryOne<{
      total_posts: number;
      published_posts: number;
      scheduled_posts: number;
      draft_posts: number;
    }>(
      `SELECT
        COUNT(*) as total_posts,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_posts,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled_posts,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_posts
       FROM posts
       WHERE user_id = ? AND created_at >= ?`,
      [user.userId, startDate.toISOString()]
    );

    // Get engagement metrics
    const engagementStats = await db.queryOne<{
      total_impressions: number;
      total_likes: number;
      total_comments: number;
      total_shares: number;
      total_clicks: number;
    }>(
      `SELECT
        SUM(impressions) as total_impressions,
        SUM(likes) as total_likes,
        SUM(comments) as total_comments,
        SUM(shares) as total_shares,
        SUM(clicks) as total_clicks
       FROM analytics a
       JOIN posts p ON a.post_id = p.id
       WHERE p.user_id = ? AND a.recorded_at >= ?`,
      [user.userId, startDate.toISOString()]
    );

    // Get platform breakdown
    const platformStats = await db.queryAll<{
      platform: string;
      post_count: number;
      total_engagement: number;
    }>(
      `SELECT
        a.platform,
        COUNT(DISTINCT a.post_id) as post_count,
        SUM(a.likes + a.comments + a.shares) as total_engagement
       FROM analytics a
       JOIN posts p ON a.post_id = p.id
       WHERE p.user_id = ? AND a.recorded_at >= ?
       GROUP BY a.platform`,
      [user.userId, startDate.toISOString()]
    );

    return c.json({
      period: { days, start_date: startDate.toISOString() },
      posts: postStats,
      engagement: engagementStats,
      platforms: platformStats,
    });
  });

  /**
   * GET /analytics/timeline
   * Get analytics data over time
   */
  analytics.get('/timeline', async (c) => {
    const user = c.get('user');
    const days = parseInt(c.req.query('days') || '30');
    const platform = c.req.query('platform');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let query = `
      SELECT
        DATE(a.recorded_at) as date,
        SUM(a.impressions) as impressions,
        SUM(a.likes) as likes,
        SUM(a.comments) as comments,
        SUM(a.shares) as shares,
        SUM(a.clicks) as clicks
      FROM analytics a
      JOIN posts p ON a.post_id = p.id
      WHERE p.user_id = ? AND a.recorded_at >= ?
    `;

    const params: any[] = [user.userId, startDate.toISOString()];

    if (platform) {
      query += ' AND a.platform = ?';
      params.push(platform);
    }

    query += ' GROUP BY DATE(a.recorded_at) ORDER BY date ASC';

    const timeline = await db.queryAll(query, params);

    return c.json({ timeline });
  });

  /**
   * GET /analytics/top-posts
   * Get top performing posts
   */
  analytics.get('/top-posts', async (c) => {
    const user = c.get('user');
    const limit = parseInt(c.req.query('limit') || '10');
    const metric = c.req.query('metric') || 'engagement'; // engagement, impressions, likes, etc.

    let orderBy = 'total_engagement';
    if (metric === 'impressions') orderBy = 'total_impressions';
    else if (metric === 'likes') orderBy = 'total_likes';
    else if (metric === 'comments') orderBy = 'total_comments';
    else if (metric === 'shares') orderBy = 'total_shares';

    const topPosts = await db.queryAll(
      `SELECT
        p.id,
        p.content,
        p.platforms,
        p.published_at,
        SUM(a.impressions) as total_impressions,
        SUM(a.likes) as total_likes,
        SUM(a.comments) as total_comments,
        SUM(a.shares) as total_shares,
        SUM(a.clicks) as total_clicks,
        SUM(a.likes + a.comments + a.shares) as total_engagement
       FROM posts p
       LEFT JOIN analytics a ON p.id = a.post_id
       WHERE p.user_id = ? AND p.status = 'published'
       GROUP BY p.id
       ORDER BY ${orderBy} DESC
       LIMIT ?`,
      [user.userId, limit]
    );

    return c.json({ posts: topPosts });
  });

  /**
   * GET /analytics/platforms
   * Get platform-specific analytics
   */
  analytics.get('/platforms', async (c) => {
    const user = c.get('user');
    const days = parseInt(c.req.query('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const platformAnalytics = await db.queryAll(
      `SELECT
        a.platform,
        COUNT(DISTINCT a.post_id) as post_count,
        SUM(a.impressions) as total_impressions,
        SUM(a.likes) as total_likes,
        SUM(a.comments) as total_comments,
        SUM(a.shares) as total_shares,
        SUM(a.clicks) as total_clicks,
        AVG(a.engagement_rate) as avg_engagement_rate
       FROM analytics a
       JOIN posts p ON a.post_id = p.id
       WHERE p.user_id = ? AND a.recorded_at >= ?
       GROUP BY a.platform`,
      [user.userId, startDate.toISOString()]
    );

    return c.json({ platforms: platformAnalytics });
  });

  /**
   * GET /analytics/audience
   * Get audience insights
   */
  analytics.get('/audience', async (c) => {
    const user = c.get('user');
    const platform = c.req.query('platform');

    if (!platform) {
      throw new ValidationError('Platform parameter is required');
    }

    // Get connected social account
    const account = await db.queryOne<{ id: string }>(
      'SELECT id FROM social_accounts WHERE user_id = ? AND platform = ? AND status = ?',
      [user.userId, platform, 'active']
    );

    if (!account) {
      throw new NotFoundError('Connected social account');
    }

    // TODO: Fetch audience data from platform APIs
    // For now, return placeholder data

    return c.json({
      platform,
      message: 'Audience insights implementation pending',
      data: {
        followers: 0,
        following: 0,
        demographics: {},
        growth: [],
      },
    });
  });

  /**
   * GET /analytics/best-times
   * Get best times to post based on historical data
   */
  analytics.get('/best-times', async (c) => {
    const user = c.get('user');
    const platform = c.req.query('platform');

    let query = `
      SELECT
        CAST(strftime('%w', p.published_at) AS INTEGER) as day_of_week,
        CAST(strftime('%H', p.published_at) AS INTEGER) as hour_of_day,
        AVG(a.engagement_rate) as avg_engagement_rate,
        COUNT(*) as post_count
      FROM posts p
      JOIN analytics a ON p.id = a.post_id
      WHERE p.user_id = ? AND p.status = 'published'
    `;

    const params: any[] = [user.userId];

    if (platform) {
      query += ' AND a.platform = ?';
      params.push(platform);
    }

    query += ' GROUP BY day_of_week, hour_of_day HAVING post_count >= 3 ORDER BY avg_engagement_rate DESC LIMIT 10';

    const bestTimes = await db.queryAll(query, params);

    return c.json({ best_times: bestTimes });
  });

  /**
   * POST /analytics/record
   * Record analytics data (internal use or webhook)
   */
  analytics.post('/record', async (c) => {
    const user = c.get('user');
    const body = await c.req.json();

    const {
      post_id,
      platform,
      impressions,
      likes,
      comments,
      shares,
      clicks,
      engagement_rate,
    } = body;

    if (!post_id || !platform) {
      throw new ValidationError('post_id and platform are required');
    }

    // Verify post ownership
    const post = await db.queryOne<{ user_id: string }>(
      'SELECT user_id FROM posts WHERE id = ?',
      [post_id]
    );

    if (!post) {
      throw new NotFoundError('Post');
    }

    if (post.user_id !== user.userId && user.role !== 'admin') {
      throw new ValidationError('You do not have access to this post');
    }

    const analyticsId = db.generateUUID();
    const now = db.getCurrentTimestamp();

    await db.execute(
      `INSERT INTO analytics (
        id, post_id, platform, impressions, likes, comments, shares, clicks,
        engagement_rate, recorded_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        analyticsId, post_id, platform,
        impressions || 0, likes || 0, comments || 0, shares || 0, clicks || 0,
        engagement_rate || 0, now, now
      ]
    );

    return c.json({ message: 'Analytics recorded successfully' }, 201);
  });

  return analytics;
}