import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import { ValidationError, NotFoundError, AuthorizationError } from '../utils/errors';
import { authMiddleware } from '../middleware/auth';
import { JWTService } from '../utils/jwt';

export function createMediaRoutes(db: DatabaseService, jwtService: JWTService) {
  const media = new Hono();

  // All routes require authentication
  media.use('*', authMiddleware(jwtService));

  /**
   * POST /media/upload
   * Upload media file to R2
   */
  media.post('/upload', async (c) => {
    const user = c.get('user');
    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw new ValidationError('No file provided');
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new ValidationError('File size must be less than 10MB');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'];
    if (!allowedTypes.includes(file.type)) {
      throw new ValidationError('Invalid file type. Allowed: JPEG, PNG, GIF, WEBP, MP4, MOV');
    }

    const mediaId = db.generateUUID();
    const now = db.getCurrentTimestamp();
    
    // Generate unique filename
    const extension = file.name.split('.').pop();
    const filename = `${user.userId}/${mediaId}.${extension}`;

    // TODO: Upload to Cloudflare R2
    // For now, store metadata only
    const r2Url = `https://media.hlpfl.org/${filename}`;

    await db.execute(
      `INSERT INTO media_files (
        id, user_id, filename, file_type, file_size, url, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [mediaId, user.userId, file.name, file.type, file.size, r2Url, now, now]
    );

    const mediaFile = await db.queryOne(
      'SELECT id, filename, file_type, file_size, url, created_at FROM media_files WHERE id = ?',
      [mediaId]
    );

    return c.json({ media: mediaFile }, 201);
  });

  /**
   * GET /media
   * List user's media files
   */
  media.get('/', async (c) => {
    const user = c.get('user');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const type = c.req.query('type'); // image or video

    let query = 'SELECT id, filename, file_type, file_size, url, created_at FROM media_files WHERE user_id = ?';
    const params: any[] = [user.userId];

    if (type) {
      query += ' AND file_type LIKE ?';
      params.push(`${type}/%`);
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.paginate(query, params, page, limit);

    return c.json(result);
  });

  /**
   * GET /media/:id
   * Get media file details
   */
  media.get('/:id', async (c) => {
    const mediaId = c.req.param('id');
    const user = c.get('user');

    const mediaFile = await db.queryOne<any>(
      'SELECT * FROM media_files WHERE id = ?',
      [mediaId]
    );

    if (!mediaFile) {
      throw new NotFoundError('Media file');
    }

    if (mediaFile.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this media file');
    }

    return c.json({ media: mediaFile });
  });

  /**
   * DELETE /media/:id
   * Delete media file
   */
  media.delete('/:id', async (c) => {
    const mediaId = c.req.param('id');
    const user = c.get('user');

    const mediaFile = await db.queryOne<{ user_id: string; url: string }>(
      'SELECT user_id, url FROM media_files WHERE id = ?',
      [mediaId]
    );

    if (!mediaFile) {
      throw new NotFoundError('Media file');
    }

    if (mediaFile.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this media file');
    }

    // TODO: Delete from R2 storage
    // await r2.delete(mediaFile.url);

    await db.execute('DELETE FROM media_files WHERE id = ?', [mediaId]);

    return c.json({ message: 'Media file deleted successfully' });
  });

  /**
   * PATCH /media/:id
   * Update media metadata (alt text, tags, etc.)
   */
  media.patch('/:id', async (c) => {
    const mediaId = c.req.param('id');
    const user = c.get('user');
    const body = await c.req.json();

    const mediaFile = await db.queryOne<{ user_id: string }>(
      'SELECT user_id FROM media_files WHERE id = ?',
      [mediaId]
    );

    if (!mediaFile) {
      throw new NotFoundError('Media file');
    }

    if (mediaFile.user_id !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('You do not have access to this media file');
    }

    const { alt_text, tags } = body;
    const updates: string[] = [];
    const params: any[] = [];

    if (alt_text !== undefined) {
      updates.push('alt_text = ?');
      params.push(alt_text);
    }

    if (tags !== undefined) {
      updates.push('tags = ?');
      params.push(JSON.stringify(tags));
    }

    if (updates.length === 0) {
      throw new ValidationError('No fields to update');
    }

    updates.push('updated_at = ?');
    params.push(db.getCurrentTimestamp());
    params.push(mediaId);

    await db.execute(
      `UPDATE media_files SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    const updatedMedia = await db.queryOne(
      'SELECT * FROM media_files WHERE id = ?',
      [mediaId]
    );

    return c.json({ media: updatedMedia });
  });

  /**
   * GET /media/search
   * Search media files
   */
  media.get('/search', async (c) => {
    const user = c.get('user');
    const query = c.req.query('q');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');

    if (!query) {
      throw new ValidationError('Search query is required');
    }

    const searchQuery = `
      SELECT id, filename, file_type, file_size, url, alt_text, tags, created_at
      FROM media_files
      WHERE user_id = ? AND (
        filename LIKE ? OR
        alt_text LIKE ? OR
        tags LIKE ?
      )
      ORDER BY created_at DESC
    `;

    const searchTerm = `%${query}%`;
    const result = await db.paginate(
      searchQuery,
      [user.userId, searchTerm, searchTerm, searchTerm],
      page,
      limit
    );

    return c.json(result);
  });

  /**
   * GET /media/stats
   * Get media storage statistics
   */
  media.get('/stats', async (c) => {
    const user = c.get('user');

    const stats = await db.queryOne<{
      total_files: number;
      total_size: number;
      image_count: number;
      video_count: number;
    }>(
      `SELECT
        COUNT(*) as total_files,
        SUM(file_size) as total_size,
        SUM(CASE WHEN file_type LIKE 'image/%' THEN 1 ELSE 0 END) as image_count,
        SUM(CASE WHEN file_type LIKE 'video/%' THEN 1 ELSE 0 END) as video_count
       FROM media_files
       WHERE user_id = ?`,
      [user.userId]
    );

    return c.json({ stats });
  });

  return media;
}