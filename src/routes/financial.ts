import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import { validateData, recordRevenueSchema, recordExpenseSchema } from '../utils/validation';
import { ValidationError, NotFoundError, AuthorizationError } from '../utils/errors';
import { authMiddleware, requireRole } from '../middleware/auth';
import { JWTService } from '../utils/jwt';

export function createFinancialRoutes(db: DatabaseService, jwtService: JWTService) {
  const financial = new Hono();

  // All routes require authentication
  financial.use('*', authMiddleware(jwtService));

  /**
   * GET /financial/dashboard
   * Get financial dashboard for artist
   */
  financial.get('/dashboard', async (c) => {
    const user = c.get('user');
    const year = parseInt(c.req.query('year') || new Date().getFullYear().toString());
    const month = c.req.query('month') ? parseInt(c.req.query('month')) : null;

    // Build date filter
    let dateFilter = `strftime('%Y', date) = ?`;
    const params: any[] = [year.toString()];

    if (month !== null) {
      dateFilter += ` AND strftime('%m', date) = ?`;
      params.push(month.toString().padStart(2, '0'));
    }

    // Get revenue
    const revenue = await db.queryOne<{
      total_revenue: number;
      transaction_count: number;
    }>(
      `SELECT 
        COALESCE(SUM(amount), 0) as total_revenue,
        COUNT(*) as transaction_count
       FROM artist_revenue
       WHERE artist_id = ? AND ${dateFilter}`,
      [user.userId, ...params]
    );

    // Get expenses
    const expenses = await db.queryOne<{
      total_expenses: number;
      approved_expenses: number;
      pending_expenses: number;
    }>(
      `SELECT 
        COALESCE(SUM(amount), 0) as total_expenses,
        COALESCE(SUM(CASE WHEN approved = 1 THEN amount ELSE 0 END), 0) as approved_expenses,
        COALESCE(SUM(CASE WHEN approved = 0 THEN amount ELSE 0 END), 0) as pending_expenses
       FROM artist_expenses
       WHERE artist_id = ? AND ${dateFilter}`,
      [user.userId, ...params]
    );

    // Calculate net revenue and commission
    const grossRevenue = revenue?.total_revenue || 0;
    const approvedExpenses = expenses?.approved_expenses || 0;
    const netRevenue = grossRevenue - approvedExpenses;
    const commissionRate = 0.11; // 11%
    const commissionAmount = netRevenue * commissionRate;
    const artistEarnings = netRevenue - commissionAmount;

    return c.json({
      period: { year, month },
      revenue: {
        gross: grossRevenue,
        transaction_count: revenue?.transaction_count || 0,
      },
      expenses: {
        total: expenses?.total_expenses || 0,
        approved: approvedExpenses,
        pending: expenses?.pending_expenses || 0,
      },
      net_revenue: netRevenue,
      commission: {
        rate: commissionRate,
        amount: commissionAmount,
      },
      artist_earnings: artistEarnings,
    });
  });

  /**
   * POST /financial/revenue
   * Record revenue (manager only)
   */
  financial.post('/revenue', requireRole('manager', 'admin'), async (c) => {
    const body = await c.req.json();
    const validation = validateData(recordRevenueSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { artist_id, amount, source, date, description } = validation.data;

    // Verify artist exists
    const artist = await db.queryOne(
      'SELECT id FROM users WHERE id = ? AND role = ?',
      [artist_id, 'artist']
    );

    if (!artist) {
      throw new NotFoundError('Artist');
    }

    const revenueId = db.generateUUID();
    const now = db.getCurrentTimestamp();

    await db.execute(
      `INSERT INTO artist_revenue (id, artist_id, amount, source, date, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [revenueId, artist_id, amount, source, date, description || null, now]
    );

    const revenue = await db.queryOne(
      'SELECT * FROM artist_revenue WHERE id = ?',
      [revenueId]
    );

    return c.json({ revenue }, 201);
  });

  /**
   * GET /financial/revenue
   * Get revenue records
   */
  financial.get('/revenue', async (c) => {
    const user = c.get('user');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const artistId = c.req.query('artist_id');

    // Artists can only see their own revenue
    let targetArtistId = user.userId;
    if (artistId && (user.role === 'manager' || user.role === 'admin')) {
      targetArtistId = artistId;
    }

    const result = await db.paginate(
      'SELECT * FROM artist_revenue WHERE artist_id = ? ORDER BY date DESC',
      [targetArtistId],
      page,
      limit
    );

    return c.json(result);
  });

  /**
   * POST /financial/expenses
   * Record expense
   */
  financial.post('/expenses', async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const validation = validateData(recordExpenseSchema, body);

    if (!validation.success) {
      throw new ValidationError('Validation failed', validation.errors);
    }

    const { artist_id, amount, category, date, description, approved } = validation.data;

    // Artists can only record their own expenses
    let targetArtistId = artist_id;
    if (user.role === 'artist') {
      targetArtistId = user.userId;
    }

    // Only managers/admins can approve expenses
    const isApproved = (user.role === 'manager' || user.role === 'admin') ? approved : false;

    const expenseId = db.generateUUID();
    const now = db.getCurrentTimestamp();

    await db.execute(
      `INSERT INTO artist_expenses (id, artist_id, amount, category, date, description, approved, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [expenseId, targetArtistId, amount, category, date, description || null, isApproved ? 1 : 0, now]
    );

    const expense = await db.queryOne(
      'SELECT * FROM artist_expenses WHERE id = ?',
      [expenseId]
    );

    return c.json({ expense }, 201);
  });

  /**
   * GET /financial/expenses
   * Get expense records
   */
  financial.get('/expenses', async (c) => {
    const user = c.get('user');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const artistId = c.req.query('artist_id');
    const approved = c.req.query('approved');

    // Artists can only see their own expenses
    let targetArtistId = user.userId;
    if (artistId && (user.role === 'manager' || user.role === 'admin')) {
      targetArtistId = artistId;
    }

    let query = 'SELECT * FROM artist_expenses WHERE artist_id = ?';
    const params: any[] = [targetArtistId];

    if (approved !== undefined) {
      query += ' AND approved = ?';
      params.push(approved === 'true' ? 1 : 0);
    }

    query += ' ORDER BY date DESC';

    const result = await db.paginate(query, params, page, limit);

    return c.json(result);
  });

  /**
   * PATCH /financial/expenses/:id/approve
   * Approve expense (manager only)
   */
  financial.patch('/expenses/:id/approve', requireRole('manager', 'admin'), async (c) => {
    const expenseId = c.req.param('id');

    const expense = await db.queryOne<{ id: string; approved: number }>(
      'SELECT id, approved FROM artist_expenses WHERE id = ?',
      [expenseId]
    );

    if (!expense) {
      throw new NotFoundError('Expense');
    }

    if (expense.approved === 1) {
      throw new ValidationError('Expense is already approved');
    }

    await db.execute(
      'UPDATE artist_expenses SET approved = 1, updated_at = ? WHERE id = ?',
      [db.getCurrentTimestamp(), expenseId]
    );

    return c.json({ message: 'Expense approved successfully' });
  });

  /**
   * GET /financial/reports/monthly
   * Get monthly financial report
   */
  financial.get('/reports/monthly', async (c) => {
    const user = c.get('user');
    const year = parseInt(c.req.query('year') || new Date().getFullYear().toString());
    const artistId = c.req.query('artist_id');

    // Artists can only see their own reports
    let targetArtistId = user.userId;
    if (artistId && (user.role === 'manager' || user.role === 'admin')) {
      targetArtistId = artistId;
    }

    const monthlyData = await db.queryAll(
      `SELECT 
        strftime('%m', date) as month,
        SUM(CASE WHEN type = 'revenue' THEN amount ELSE 0 END) as revenue,
        SUM(CASE WHEN type = 'expense' AND approved = 1 THEN amount ELSE 0 END) as expenses
       FROM (
         SELECT date, amount, 'revenue' as type, 1 as approved FROM artist_revenue WHERE artist_id = ? AND strftime('%Y', date) = ?
         UNION ALL
         SELECT date, amount, 'expense' as type, approved FROM artist_expenses WHERE artist_id = ? AND strftime('%Y', date) = ?
       )
       GROUP BY month
       ORDER BY month`,
      [targetArtistId, year.toString(), targetArtistId, year.toString()]
    );

    const report = monthlyData.map((row: any) => {
      const revenue = parseFloat(row.revenue) || 0;
      const expenses = parseFloat(row.expenses) || 0;
      const netRevenue = revenue - expenses;
      const commission = netRevenue * 0.11;
      const artistEarnings = netRevenue - commission;

      return {
        month: parseInt(row.month),
        revenue,
        expenses,
        net_revenue: netRevenue,
        commission,
        artist_earnings: artistEarnings,
      };
    });

    return c.json({ year, report });
  });

  /**
   * GET /financial/reports/annual
   * Get annual financial summary
   */
  financial.get('/reports/annual', async (c) => {
    const user = c.get('user');
    const artistId = c.req.query('artist_id');

    // Artists can only see their own reports
    let targetArtistId = user.userId;
    if (artistId && (user.role === 'manager' || user.role === 'admin')) {
      targetArtistId = artistId;
    }

    const annualData = await db.queryAll(
      `SELECT 
        strftime('%Y', date) as year,
        SUM(CASE WHEN type = 'revenue' THEN amount ELSE 0 END) as revenue,
        SUM(CASE WHEN type = 'expense' AND approved = 1 THEN amount ELSE 0 END) as expenses
       FROM (
         SELECT date, amount, 'revenue' as type, 1 as approved FROM artist_revenue WHERE artist_id = ?
         UNION ALL
         SELECT date, amount, 'expense' as type, approved FROM artist_expenses WHERE artist_id = ?
       )
       GROUP BY year
       ORDER BY year DESC`,
      [targetArtistId, targetArtistId]
    );

    const report = annualData.map((row: any) => {
      const revenue = parseFloat(row.revenue) || 0;
      const expenses = parseFloat(row.expenses) || 0;
      const netRevenue = revenue - expenses;
      const commission = netRevenue * 0.11;
      const artistEarnings = netRevenue - commission;

      return {
        year: parseInt(row.year),
        revenue,
        expenses,
        net_revenue: netRevenue,
        commission,
        artist_earnings: artistEarnings,
      };
    });

    return c.json({ report });
  });

  return financial;
}