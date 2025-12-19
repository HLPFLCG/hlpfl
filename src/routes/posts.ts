import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import { validateData, createPostSchema, updatePostSchema } from '../utils/validation';
import { ValidationError, NotFoundError, AuthorizationError } from '../utils/errors';
import { authMiddleware } from '../middleware/auth';
import { JWTService } from '../utils/jwt';

export function createPostRoutes(db: DatabaseService, jwtService: JWTService) {
  const posts = new Hono();

  // All routes require authentication
  posts.use('*', authMiddleware(jwtService));

  /**
   * POST /posts
   * Create a new post
   */
  posts.post('/', async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const validation = validateData(createPostSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { content, platforms, scheduled_for, media_ids, status } = validation.data;

    // Validate scheduled_for is in the future
    if (scheduled_for && new Date(scheduled_for) <= new Date()) {
      throw new ValidationError('Scheduled time must be in the future');
    }

    const postId = db.generateUUID();
    const now = db.getCurrentTimestamp();

    await db.execute(
      `INSERT INTO posts (id, user_id, content, platforms, scheduled_for, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [postId, user.userId, content, JSON.stringify(platforms), scheduled_for || null, status, now, now]
    );

    // Link media files if provided
    if (media_ids && media_ids.length > 0) {
      const mediaLinks = media_ids.map((mediaId, index) => ({
        query: 'INSERT INTO post_media (post_id, media_id, position) VALUES (?, ?, ?)',
        params: [postId, mediaId, index],
      }));
      await db.transaction(mediaLinks);
    }

    // Fetch created post with media
    const post = await getPostWithDetails(db, postId);

    return c.json({ post }, 201);
  });

  /**
   * GET /posts
   * List user's posts
   */
  posts.get('/', async (c) => {
    const user = c.get('user');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const status = c.req.query('status');

    let query = 'SELECT * FROM posts WHERE user_id = ?';
    const params: any[] = [user.userId];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.paginate(query, params, page, limit);

    // Fetch media for each post
    const postsWithMedia = await Promise.all(
      result.data.map(async (post: any) => {
        const media = await db.queryAll(
          `SELECT m.* FROM media_files m
           JOIN post_media pm ON m.id = pm.media_id
           WHERE pm.post_id = ?
           ORDER BY pm.position`,
          [post.id]
        );
        return { ...post, platforms: JSON.parse(post.platforms), media };
      })
    );

    return c.json({
      ...result,
      data: postsWithMedia,
    });
  });

  /**
   * GET /posts/:id
   * Get post by ID
   */
  posts.get('/:id', async (c) => {
    const postId = c.req.param('id');
    const user = c.get('user');

    const post = await getPostWithDetails(db, postId);

    if (!post) {
      throw new NotFoundError('Post');
    }

    // Check ownership
    if (post.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this post');
    }

    return c.json({ post });
  });

  /**
   * PUT /posts/:id
   * Update post
   */
  posts.put('/:id', async (c) => {
    const postId = c.req.param('id');
    const user = c.get('user');
    const body = await c.req.json();

    // Check ownership
    const existingPost = await db.queryOne<{ user_id: string; status: string }>(
      'SELECT user_id, status FROM posts WHERE id = ?',
      [postId]
    );

    if (!existingPost) {
      throw new NotFoundError('Post');
    }

    if (existingPost.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this post');
    }

    // Cannot edit published posts
    if (existingPost.status === 'published') {
      throw new ValidationError('Cannot edit published posts');
    }

    const validation = validateData(updatePostSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { content, platforms, scheduled_for, media_ids, status } = validation.data;

    // Build update query
    const updates: string[] = [];
    const params: any[] = [];

    if (content !== undefined) {
      updates.push('content = ?');
      params.push(content);
    }
    if (platforms !== undefined) {
      updates.push('platforms = ?');
      params.push(JSON.stringify(platforms));
    }
    if (scheduled_for !== undefined) {
      if (new Date(scheduled_for) <= new Date()) {
        throw new ValidationError('Scheduled time must be in the future');
      }
      updates.push('scheduled_for = ?');
      params.push(scheduled_for);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status);
    }

    if (updates.length > 0) {
      updates.push('updated_at = ?');
      params.push(db.getCurrentTimestamp());
      params.push(postId);

      await db.execute(
        `UPDATE posts SET ${updates.join(', ')} WHERE id = ?`,
        params
      );
    }

    // Update media if provided
    if (media_ids !== undefined) {
      await db.execute('DELETE FROM post_media WHERE post_id = ?', [postId]);
      if (media_ids.length > 0) {
        const mediaLinks = media_ids.map((mediaId, index) => ({
          query: 'INSERT INTO post_media (post_id, media_id, position) VALUES (?, ?, ?)',
          params: [postId, mediaId, index],
        }));
        await db.transaction(mediaLinks);
      }
    }

    const updatedPost = await getPostWithDetails(db, postId);

    return c.json({ post: updatedPost });
  });

  /**
   * DELETE /posts/:id
   * Delete post
   */
  posts.delete('/:id', async (c) => {
    const postId = c.req.param('id');
    const user = c.get('user');

    const post = await db.queryOne<{ user_id: string; status: string }>(
      'SELECT user_id, status FROM posts WHERE id = ?',
      [postId]
    );

    if (!post) {
      throw new NotFoundError('Post');
    }

    if (post.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this post');
    }

    // Cannot delete published posts
    if (post.status === 'published') {
      throw new ValidationError('Cannot delete published posts');
    }

    await db.execute('DELETE FROM posts WHERE id = ?', [postId]);

    return c.json({ message: 'Post deleted successfully' });
  });

  /**
   * POST /posts/:id/publish
   * Publish a post immediately
   */
  posts.post('/:id/publish', async (c) => {
    const postId = c.req.param('id');
    const user = c.get('user');

    const post = await db.queryOne<{ user_id: string; status: string }>(
      'SELECT user_id, status FROM posts WHERE id = ?',
      [postId]
    );

    if (!post) {
      throw new NotFoundError('Post');
    }

    if (post.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this post');
    }

    if (post.status === 'published') {
      throw new ValidationError('Post is already published');
    }

    const now = db.getCurrentTimestamp();

    await db.execute(
      'UPDATE posts SET status = ?, published_at = ?, updated_at = ? WHERE id = ?',
      ['published', now, now, postId]
    );

    // TODO: Trigger actual publishing to social platforms

    const updatedPost = await getPostWithDetails(db, postId);

    return c.json({ post: updatedPost });
  });

  /**
   * GET /posts/:id/analytics
   * Get post analytics
   */
  posts.get('/:id/analytics', async (c) => {
    const postId = c.req.param('id');
    const user = c.get('user');

    const post = await db.queryOne<{ user_id: string }>(
      'SELECT user_id FROM posts WHERE id = ?',
      [postId]
    );

    if (!post) {
      throw new NotFoundError('Post');
    }

    if (post.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this post');
    }

    const analytics = await db.queryAll(
      `SELECT * FROM analytics WHERE post_id = ? ORDER BY recorded_at DESC`,
      [postId]
    );

    // Calculate totals
    const totals = analytics.reduce(
      (acc, curr: any) => ({
        impressions: acc.impressions + (curr.impressions || 0),
        likes: acc.likes + (curr.likes || 0),
        comments: acc.comments + (curr.comments || 0),
        shares: acc.shares + (curr.shares || 0),
        clicks: acc.clicks + (curr.clicks || 0),
      }),
      { impressions: 0, likes: 0, comments: 0, shares: 0, clicks: 0 }
    );

    return c.json({
      analytics,
      totals,
    });
  });

  return posts;
}

/**
 * Helper function to get post with all details
 */
async function getPostWithDetails(db: DatabaseService, postId: string) {
  const post = await db.queryOne<any>(
    'SELECT * FROM posts WHERE id = ?',
    [postId]
  );

  if (!post) {
    return null;
  }

  // Fetch media
  const media = await db.queryAll(
    `SELECT m.* FROM media_files m
     JOIN post_media pm ON m.id = pm.media_id
     WHERE pm.post_id = ?
     ORDER BY pm.position`,
    [postId]
  );

  return {
    ...post,
    platforms: JSON.parse(post.platforms),
    media,
  };
}