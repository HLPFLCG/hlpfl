import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import { validateData, updateProfileSchema } from '../utils/validation';
import { ValidationError, NotFoundError, AuthorizationError } from '../utils/errors';
import { authMiddleware, requireRole } from '../middleware/auth';
import { JWTService } from '../utils/jwt';

export function createUserRoutes(db: DatabaseService, jwtService: JWTService) {
  const users = new Hono();

  // All routes require authentication
  users.use('*', authMiddleware(jwtService));

  /**
   * GET /users/:id
   * Get user profile by ID
   */
  users.get('/:id', async (c) => {
    const userId = c.req.param('id');
    const currentUser = c.get('user');

    const user = await db.queryOne<{
      id: string;
      email: string;
      name: string;
      role: string;
      bio: string | null;
      avatar_url: string | null;
      website: string | null;
      created_at: string;
    }>('SELECT id, email, name, role, bio, avatar_url, website, created_at FROM users WHERE id = ?', [userId]);

    if (!user) {
      throw new NotFoundError('User');
    }

    // Only return email if it's the current user or an admin
    if (currentUser.userId !== userId && currentUser.role !== 'admin') {
      return c.json({
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
          bio: user.bio,
          avatar_url: user.avatar_url,
          website: user.website,
          created_at: user.created_at,
        },
      });
    }

    return c.json({ user });
  });

  /**
   * PUT /users/:id
   * Update user profile
   */
  users.put('/:id', async (c) => {
    const userId = c.req.param('id');
    const currentUser = c.get('user');

    // Users can only update their own profile unless they're admin
    if (currentUser.userId !== userId && currentUser.role !== 'admin') {
      throw new AuthorizationError('You can only update your own profile');
    }

    const body = await c.req.json();
    const validation = validateData(updateProfileSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { name, bio, avatar_url, website } = validation.data;

    // Build update query dynamically
    const updates: string[] = [];
    const params: any[] = [];

    if (name !== undefined) {
      updates.push('name = ?');
      params.push(name);
    }
    if (bio !== undefined) {
      updates.push('bio = ?');
      params.push(bio);
    }
    if (avatar_url !== undefined) {
      updates.push('avatar_url = ?');
      params.push(avatar_url);
    }
    if (website !== undefined) {
      updates.push('website = ?');
      params.push(website);
    }

    if (updates.length === 0) {
      throw new ValidationError('No fields to update');
    }

    updates.push('updated_at = ?');
    params.push(db.getCurrentTimestamp());
    params.push(userId);

    await db.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    // Fetch updated user
    const updatedUser = await db.queryOne<{
      id: string;
      email: string;
      name: string;
      role: string;
      bio: string | null;
      avatar_url: string | null;
      website: string | null;
    }>('SELECT id, email, name, role, bio, avatar_url, website FROM users WHERE id = ?', [userId]);

    return c.json({ user: updatedUser });
  });

  /**
   * DELETE /users/:id
   * Delete user account
   */
  users.delete('/:id', async (c) => {
    const userId = c.req.param('id');
    const currentUser = c.get('user');

    // Users can only delete their own account unless they're admin
    if (currentUser.userId !== userId && currentUser.role !== 'admin') {
      throw new AuthorizationError('You can only delete your own account');
    }

    // Check if user exists
    const exists = await db.exists('users', 'id', userId);
    if (!exists) {
      throw new NotFoundError('User');
    }

    // Soft delete by setting deleted_at
    await db.execute(
      'UPDATE users SET deleted_at = ? WHERE id = ?',
      [db.getCurrentTimestamp(), userId]
    );

    return c.json({ message: 'Account deleted successfully' });
  });

  /**
   * GET /users
   * List all users (admin only)
   */
  users.get('/', requireRole('admin', 'manager'), async (c) => {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const role = c.req.query('role');

    let query = 'SELECT id, email, name, role, avatar_url, created_at FROM users WHERE deleted_at IS NULL';
    const params: any[] = [];

    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.paginate(query, params, page, limit);

    return c.json(result);
  });

  /**
   * PATCH /users/:id/role
   * Update user role (admin only)
   */
  users.patch('/:id/role', requireRole('admin'), async (c) => {
    const userId = c.req.param('id');
    const body = await c.req.json();
    const { role } = body;

    if (!role || !['artist', 'manager', 'team_member', 'admin'].includes(role)) {
      throw new ValidationError('Invalid role');
    }

    const exists = await db.exists('users', 'id', userId);
    if (!exists) {
      throw new NotFoundError('User');
    }

    await db.execute(
      'UPDATE users SET role = ?, updated_at = ? WHERE id = ?',
      [role, db.getCurrentTimestamp(), userId]
    );

    return c.json({ message: 'User role updated successfully' });
  });

  return users;
}