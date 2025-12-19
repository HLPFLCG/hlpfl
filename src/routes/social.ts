import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import { validateData, connectSocialAccountSchema } from '../utils/validation';
import { ValidationError, NotFoundError, AuthorizationError } from '../utils/errors';
import { authMiddleware } from '../middleware/auth';
import { JWTService } from '../utils/jwt';

export function createSocialRoutes(db: DatabaseService, jwtService: JWTService) {
  const social = new Hono();

  // All routes require authentication
  social.use('*', authMiddleware(jwtService));

  /**
   * GET /social/accounts
   * List user's connected social accounts
   */
  social.get('/accounts', async (c) => {
    const user = c.get('user');

    const accounts = await db.queryAll(
      `SELECT id, platform, platform_user_id, platform_username, status, connected_at, last_sync_at
       FROM social_accounts
       WHERE user_id = ?
       ORDER BY connected_at DESC`,
      [user.userId]
    );

    return c.json({ accounts });
  });

  /**
   * POST /social/accounts
   * Connect a new social account
   */
  social.post('/accounts', async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const validation = validateData(connectSocialAccountSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { platform, access_token, refresh_token, platform_user_id, platform_username, expires_at } = validation.data;

    // Check if account already connected
    const existing = await db.queryOne(
      'SELECT id FROM social_accounts WHERE user_id = ? AND platform = ? AND platform_user_id = ?',
      [user.userId, platform, platform_user_id]
    );

    if (existing) {
      throw new ValidationError('This social account is already connected');
    }

    const accountId = db.generateUUID();
    const now = db.getCurrentTimestamp();

    await db.execute(
      `INSERT INTO social_accounts (
        id, user_id, platform, access_token, refresh_token,
        platform_user_id, platform_username, expires_at,
        status, connected_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        accountId, user.userId, platform, access_token, refresh_token || null,
        platform_user_id, platform_username, expires_at || null,
        'active', now, now, now
      ]
    );

    const account = await db.queryOne(
      `SELECT id, platform, platform_user_id, platform_username, status, connected_at
       FROM social_accounts WHERE id = ?`,
      [accountId]
    );

    return c.json({ account }, 201);
  });

  /**
   * GET /social/accounts/:id
   * Get social account details
   */
  social.get('/accounts/:id', async (c) => {
    const accountId = c.req.param('id');
    const user = c.get('user');

    const account = await db.queryOne<any>(
      `SELECT id, platform, platform_user_id, platform_username, status, connected_at, last_sync_at, expires_at
       FROM social_accounts WHERE id = ?`,
      [accountId]
    );

    if (!account) {
      throw new NotFoundError('Social account');
    }

    if (account.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this account');
    }

    return c.json({ account });
  });

  /**
   * DELETE /social/accounts/:id
   * Disconnect social account
   */
  social.delete('/accounts/:id', async (c) => {
    const accountId = c.req.param('id');
    const user = c.get('user');

    const account = await db.queryOne<{ user_id: string }>(
      'SELECT user_id FROM social_accounts WHERE id = ?',
      [accountId]
    );

    if (!account) {
      throw new NotFoundError('Social account');
    }

    if (account.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this account');
    }

    await db.execute('DELETE FROM social_accounts WHERE id = ?', [accountId]);

    return c.json({ message: 'Social account disconnected successfully' });
  });

  /**
   * POST /social/accounts/:id/refresh
   * Refresh social account token
   */
  social.post('/accounts/:id/refresh', async (c) => {
    const accountId = c.req.param('id');
    const user = c.get('user');

    const account = await db.queryOne<{
      user_id: string;
      platform: string;
      refresh_token: string | null;
    }>(
      'SELECT user_id, platform, refresh_token FROM social_accounts WHERE id = ?',
      [accountId]
    );

    if (!account) {
      throw new NotFoundError('Social account');
    }

    if (account.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this account');
    }

    if (!account.refresh_token) {
      throw new ValidationError('No refresh token available for this account');
    }

    // TODO: Implement actual token refresh logic for each platform
    // For now, just update the last_sync_at timestamp

    await db.execute(
      'UPDATE social_accounts SET last_sync_at = ?, updated_at = ? WHERE id = ?',
      [db.getCurrentTimestamp(), db.getCurrentTimestamp(), accountId]
    );

    return c.json({ message: 'Token refresh initiated' });
  });

  /**
   * GET /social/oauth/:platform/authorize
   * Get OAuth authorization URL for a platform
   */
  social.get('/oauth/:platform/authorize', async (c) => {
    const platform = c.req.param('platform');
    const user = c.get('user');

    // TODO: Implement OAuth flow for each platform
    // Return authorization URL based on platform

    const authUrls: Record<string, string> = {
      twitter: 'https://twitter.com/i/oauth2/authorize',
      linkedin: 'https://www.linkedin.com/oauth/v2/authorization',
      facebook: 'https://www.facebook.com/v18.0/dialog/oauth',
      instagram: 'https://api.instagram.com/oauth/authorize',
    };

    const authUrl = authUrls[platform];

    if (!authUrl) {
      throw new ValidationError('Unsupported platform');
    }

    // In production, generate proper OAuth URL with client_id, redirect_uri, state, etc.
    return c.json({
      authUrl,
      message: 'OAuth implementation pending',
    });
  });

  /**
   * POST /social/oauth/:platform/callback
   * Handle OAuth callback
   */
  social.post('/oauth/:platform/callback', async (c) => {
    const platform = c.req.param('platform');
    const user = c.get('user');
    const body = await c.req.json();
    const { code, state } = body;

    if (!code) {
      throw new ValidationError('Authorization code is required');
    }

    // TODO: Implement OAuth callback handling
    // 1. Exchange code for access token
    // 2. Get user info from platform
    // 3. Store tokens in database

    return c.json({
      message: 'OAuth callback implementation pending',
    });
  });

  return social;
}