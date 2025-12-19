import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import { JWTService } from '../utils/jwt';
import { PasswordService } from '../utils/password';
import { validateData, registerSchema, loginSchema } from '../utils/validation';
import { ValidationError, AuthenticationError, ConflictError, NotFoundError } from '../utils/errors';
import { authMiddleware } from '../middleware/auth';

export function createAuthRoutes(db: DatabaseService, jwtService: JWTService, passwordService: PasswordService) {
  const auth = new Hono();

  /**
   * POST /auth/register
   * Register a new user
   */
  auth.post('/register', async (c) => {
    const body = await c.req.json();
    const validation = validateData(registerSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { email, password, name, role = 'artist' } = validation.data;

    // Check if user already exists
    const existingUser = await db.queryOne(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const passwordHash = await passwordService.hashPassword(password);

    // Create user
    const userId = db.generateUUID();
    const now = db.getCurrentTimestamp();

    await db.execute(
      `INSERT INTO users (id, email, password_hash, name, role, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, email, passwordHash, name, role, now, now]
    );

    // Generate tokens
    const { accessToken, refreshToken } = await jwtService.generateTokenPair({
      userId,
      email,
      role,
    });

    return c.json({
      user: {
        id: userId,
        email,
        name,
        role,
      },
      accessToken,
      refreshToken,
    }, 201);
  });

  /**
   * POST /auth/login
   * Login user
   */
  auth.post('/login', async (c) => {
    const body = await c.req.json();
    const validation = validateData(loginSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { email, password } = validation.data;

    // Find user
    const user = await db.queryOne<{
      id: string;
      email: string;
      password_hash: string;
      name: string;
      role: string;
      avatar_url: string | null;
    }>('SELECT id, email, password_hash, name, role, avatar_url FROM users WHERE email = ?', [email]);

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Verify password
    const isValid = await passwordService.verifyPassword(password, user.password_hash);

    if (!isValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate tokens
    const { accessToken, refreshToken } = await jwtService.generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last login
    await db.execute(
      'UPDATE users SET last_login_at = ? WHERE id = ?',
      [db.getCurrentTimestamp(), user.id]
    );

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar_url: user.avatar_url,
      },
      accessToken,
      refreshToken,
    });
  });

  /**
   * POST /auth/refresh
   * Refresh access token
   */
  auth.post('/refresh', async (c) => {
    const body = await c.req.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      throw new ValidationError('Refresh token is required');
    }

    try {
      const payload = await jwtService.verifyToken(refreshToken);

      // Generate new access token
      const accessToken = await jwtService.generateAccessToken({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      });

      return c.json({ accessToken });
    } catch (error) {
      throw new AuthenticationError('Invalid or expired refresh token');
    }
  });

  /**
   * GET /auth/me
   * Get current user profile
   */
  auth.get('/me', authMiddleware(jwtService), async (c) => {
    const user = c.get('user');

    const profile = await db.queryOne<{
      id: string;
      email: string;
      name: string;
      role: string;
      bio: string | null;
      avatar_url: string | null;
      website: string | null;
      created_at: string;
    }>('SELECT id, email, name, role, bio, avatar_url, website, created_at FROM users WHERE id = ?', [user.userId]);

    if (!profile) {
      throw new NotFoundError('User');
    }

    return c.json({ user: profile });
  });

  /**
   * POST /auth/logout
   * Logout user (client-side token removal)
   */
  auth.post('/logout', authMiddleware(jwtService), async (c) => {
    // In a stateless JWT system, logout is handled client-side
    // For enhanced security, implement token blacklisting using KV storage
    return c.json({ message: 'Logged out successfully' });
  });

  /**
   * POST /auth/forgot-password
   * Request password reset
   */
  auth.post('/forgot-password', async (c) => {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      throw new ValidationError('Email is required');
    }

    const user = await db.queryOne<{ id: string }>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      // Don't reveal if user exists
      return c.json({ message: 'If the email exists, a reset link has been sent' });
    }

    // Generate reset token
    const resetToken = passwordService.generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    // Store reset token (in production, use KV storage)
    await db.execute(
      `INSERT INTO password_resets (user_id, token, expires_at, created_at)
       VALUES (?, ?, ?, ?)`,
      [user.id, resetToken, expiresAt, db.getCurrentTimestamp()]
    );

    // TODO: Send email with reset link
    // For now, return token (remove in production)
    return c.json({
      message: 'If the email exists, a reset link has been sent',
      // Remove this in production:
      resetToken,
    });
  });

  /**
   * POST /auth/reset-password
   * Reset password with token
   */
  auth.post('/reset-password', async (c) => {
    const body = await c.req.json();
    const { token, password } = body;

    if (!token || !password) {
      throw new ValidationError('Token and password are required');
    }

    if (password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters');
    }

    // Verify token
    const reset = await db.queryOne<{ user_id: string; expires_at: string }>(
      'SELECT user_id, expires_at FROM password_resets WHERE token = ? AND used = 0',
      [token]
    );

    if (!reset) {
      throw new AuthenticationError('Invalid or expired reset token');
    }

    if (new Date(reset.expires_at) < new Date()) {
      throw new AuthenticationError('Reset token has expired');
    }

    // Hash new password
    const passwordHash = await passwordService.hashPassword(password);

    // Update password and mark token as used
    await db.transaction([
      {
        query: 'UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?',
        params: [passwordHash, db.getCurrentTimestamp(), reset.user_id],
      },
      {
        query: 'UPDATE password_resets SET used = 1 WHERE token = ?',
        params: [token],
      },
    ]);

    return c.json({ message: 'Password reset successfully' });
  });

  return auth;
}