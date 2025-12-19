import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import { validateData, createTeamSchema, inviteTeamMemberSchema } from '../utils/validation';
import { ValidationError, NotFoundError, AuthorizationError } from '../utils/errors';
import { authMiddleware } from '../middleware/auth';
import { JWTService } from '../utils/jwt';

export function createTeamRoutes(db: DatabaseService, jwtService: JWTService) {
  const teams = new Hono();

  // All routes require authentication
  teams.use('*', authMiddleware(jwtService));

  /**
   * POST /teams
   * Create a new team
   */
  teams.post('/', async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const validation = validateData(createTeamSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { name, description } = validation.data;

    const teamId = db.generateUUID();
    const now = db.getCurrentTimestamp();

    // Create team
    await db.execute(
      `INSERT INTO teams (id, name, description, owner_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [teamId, name, description || null, user.userId, now, now]
    );

    // Add creator as admin member
    const memberId = db.generateUUID();
    await db.execute(
      `INSERT INTO team_members (id, team_id, user_id, role, joined_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [memberId, teamId, user.userId, 'admin', now, now]
    );

    const team = await db.queryOne(
      'SELECT * FROM teams WHERE id = ?',
      [teamId]
    );

    return c.json({ team }, 201);
  });

  /**
   * GET /teams
   * List user's teams
   */
  teams.get('/', async (c) => {
    const user = c.get('user');

    const userTeams = await db.queryAll(
      `SELECT t.*, tm.role as user_role
       FROM teams t
       JOIN team_members tm ON t.id = tm.team_id
       WHERE tm.user_id = ?
       ORDER BY t.created_at DESC`,
      [user.userId]
    );

    return c.json({ teams: userTeams });
  });

  /**
   * GET /teams/:id
   * Get team details
   */
  teams.get('/:id', async (c) => {
    const teamId = c.req.param('id');
    const user = c.get('user');

    // Check if user is a member
    const membership = await db.queryOne<{ role: string }>(
      'SELECT role FROM team_members WHERE team_id = ? AND user_id = ?',
      [teamId, user.userId]
    );

    if (!membership) {
      throw new AuthorizationError('You are not a member of this team');
    }

    const team = await db.queryOne(
      'SELECT * FROM teams WHERE id = ?',
      [teamId]
    );

    if (!team) {
      throw new NotFoundError('Team');
    }

    // Get team members
    const members = await db.queryAll(
      `SELECT tm.id, tm.role, tm.joined_at, u.id as user_id, u.name, u.email, u.avatar_url
       FROM team_members tm
       JOIN users u ON tm.user_id = u.id
       WHERE tm.team_id = ?
       ORDER BY tm.joined_at ASC`,
      [teamId]
    );

    return c.json({
      team: {
        ...team,
        members,
        user_role: membership.role,
      },
    });
  });

  /**
   * PUT /teams/:id
   * Update team details
   */
  teams.put('/:id', async (c) => {
    const teamId = c.req.param('id');
    const user = c.get('user');
    const body = await c.req.json();

    // Check if user is admin
    const membership = await db.queryOne<{ role: string }>(
      'SELECT role FROM team_members WHERE team_id = ? AND user_id = ?',
      [teamId, user.userId]
    );

    if (!membership || membership.role !== 'admin') {
      throw new AuthorizationError('Only team admins can update team details');
    }

    const { name, description } = body;
    const updates: string[] = [];
    const params: any[] = [];

    if (name !== undefined) {
      updates.push('name = ?');
      params.push(name);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description);
    }

    if (updates.length === 0) {
      throw new ValidationError('No fields to update');
    }

    updates.push('updated_at = ?');
    params.push(db.getCurrentTimestamp());
    params.push(teamId);

    await db.execute(
      `UPDATE teams SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    const updatedTeam = await db.queryOne(
      'SELECT * FROM teams WHERE id = ?',
      [teamId]
    );

    return c.json({ team: updatedTeam });
  });

  /**
   * DELETE /teams/:id
   * Delete team
   */
  teams.delete('/:id', async (c) => {
    const teamId = c.req.param('id');
    const user = c.get('user');

    // Check if user is owner
    const team = await db.queryOne<{ owner_id: string }>(
      'SELECT owner_id FROM teams WHERE id = ?',
      [teamId]
    );

    if (!team) {
      throw new NotFoundError('Team');
    }

    if (team.owner_id !== user.userId) {
      throw new AuthorizationError('Only team owner can delete the team');
    }

    await db.execute('DELETE FROM teams WHERE id = ?', [teamId]);

    return c.json({ message: 'Team deleted successfully' });
  });

  /**
   * POST /teams/:id/invite
   * Invite member to team
   */
  teams.post('/:id/invite', async (c) => {
    const teamId = c.req.param('id');
    const user = c.get('user');
    const body = await c.req.json();

    const validation = validateData(inviteTeamMemberSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    // Check if user is admin
    const membership = await db.queryOne<{ role: string }>(
      'SELECT role FROM team_members WHERE team_id = ? AND user_id = ?',
      [teamId, user.userId]
    );

    if (!membership || membership.role !== 'admin') {
      throw new AuthorizationError('Only team admins can invite members');
    }

    const { email, role } = validation.data;

    // Find user by email
    const invitedUser = await db.queryOne<{ id: string }>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (!invitedUser) {
      throw new NotFoundError('User with this email');
    }

    // Check if already a member
    const existingMember = await db.queryOne(
      'SELECT id FROM team_members WHERE team_id = ? AND user_id = ?',
      [teamId, invitedUser.id]
    );

    if (existingMember) {
      throw new ValidationError('User is already a team member');
    }

    const memberId = db.generateUUID();
    const now = db.getCurrentTimestamp();

    await db.execute(
      `INSERT INTO team_members (id, team_id, user_id, role, joined_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [memberId, teamId, invitedUser.id, role, now, now]
    );

    // TODO: Send invitation email

    return c.json({ message: 'Team member invited successfully' }, 201);
  });

  /**
   * PATCH /teams/:teamId/members/:memberId
   * Update team member role
   */
  teams.patch('/:teamId/members/:memberId', async (c) => {
    const teamId = c.req.param('teamId');
    const memberId = c.req.param('memberId');
    const user = c.get('user');
    const body = await c.req.json();

    // Check if user is admin
    const membership = await db.queryOne<{ role: string }>(
      'SELECT role FROM team_members WHERE team_id = ? AND user_id = ?',
      [teamId, user.userId]
    );

    if (!membership || membership.role !== 'admin') {
      throw new AuthorizationError('Only team admins can update member roles');
    }

    const { role } = body;

    if (!role || !['admin', 'editor', 'viewer'].includes(role)) {
      throw new ValidationError('Invalid role');
    }

    await db.execute(
      'UPDATE team_members SET role = ? WHERE id = ? AND team_id = ?',
      [role, memberId, teamId]
    );

    return c.json({ message: 'Member role updated successfully' });
  });

  /**
   * DELETE /teams/:teamId/members/:memberId
   * Remove team member
   */
  teams.delete('/:teamId/members/:memberId', async (c) => {
    const teamId = c.req.param('teamId');
    const memberId = c.req.param('memberId');
    const user = c.get('user');

    // Check if user is admin
    const membership = await db.queryOne<{ role: string }>(
      'SELECT role FROM team_members WHERE team_id = ? AND user_id = ?',
      [teamId, user.userId]
    );

    if (!membership || membership.role !== 'admin') {
      throw new AuthorizationError('Only team admins can remove members');
    }

    // Cannot remove team owner
    const team = await db.queryOne<{ owner_id: string }>(
      'SELECT owner_id FROM teams WHERE id = ?',
      [teamId]
    );

    const memberToRemove = await db.queryOne<{ user_id: string }>(
      'SELECT user_id FROM team_members WHERE id = ?',
      [memberId]
    );

    if (memberToRemove && team && memberToRemove.user_id === team.owner_id) {
      throw new ValidationError('Cannot remove team owner');
    }

    await db.execute(
      'DELETE FROM team_members WHERE id = ? AND team_id = ?',
      [memberId, teamId]
    );

    return c.json({ message: 'Team member removed successfully' });
  });

  /**
   * POST /teams/:id/leave
   * Leave team
   */
  teams.post('/:id/leave', async (c) => {
    const teamId = c.req.param('id');
    const user = c.get('user');

    // Check if user is owner
    const team = await db.queryOne<{ owner_id: string }>(
      'SELECT owner_id FROM teams WHERE id = ?',
      [teamId]
    );

    if (!team) {
      throw new NotFoundError('Team');
    }

    if (team.owner_id === user.userId) {
      throw new ValidationError('Team owner cannot leave. Transfer ownership or delete the team.');
    }

    await db.execute(
      'DELETE FROM team_members WHERE team_id = ? AND user_id = ?',
      [teamId, user.userId]
    );

    return c.json({ message: 'Left team successfully' });
  });

  return teams;
}