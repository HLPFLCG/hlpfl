import { D1Database } from '@cloudflare/workers-types';

export class DatabaseService {
  constructor(private db: D1Database) {}

  /**
   * Execute a query and return the first result
   */
  async queryOne<T>(query: string, params: any[] = []): Promise<T | null> {
    const result = await this.db.prepare(query).bind(...params).first<T>();
    return result;
  }

  /**
   * Execute a query and return all results
   */
  async queryAll<T>(query: string, params: any[] = []): Promise<T[]> {
    const result = await this.db.prepare(query).bind(...params).all<T>();
    return result.results || [];
  }

  /**
   * Execute an insert/update/delete query
   */
  async execute(query: string, params: any[] = []): Promise<D1Result> {
    return await this.db.prepare(query).bind(...params).run();
  }

  /**
   * Execute multiple queries in a transaction
   */
  async transaction(queries: Array<{ query: string; params: any[] }>): Promise<D1Result[]> {
    const statements = queries.map(({ query, params }) =>
      this.db.prepare(query).bind(...params)
    );
    return await this.db.batch(statements);
  }

  /**
   * Check if a record exists
   */
  async exists(table: string, column: string, value: any): Promise<boolean> {
    const result = await this.queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM ${table} WHERE ${column} = ?`,
      [value]
    );
    return (result?.count || 0) > 0;
  }

  /**
   * Get paginated results
   */
  async paginate<T>(
    query: string,
    params: any[] = [],
    page: number = 1,
    limit: number = 20
  ): Promise<{ data: T[]; total: number; page: number; totalPages: number }> {
    const offset = (page - 1) * limit;

    // Get total count
    const countQuery = query.replace(/SELECT .+ FROM/, 'SELECT COUNT(*) as count FROM');
    const countResult = await this.queryOne<{ count: number }>(countQuery, params);
    const total = countResult?.count || 0;

    // Get paginated data
    const paginatedQuery = `${query} LIMIT ? OFFSET ?`;
    const data = await this.queryAll<T>(paginatedQuery, [...params, limit, offset]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Generate UUID v4
   */
  generateUUID(): string {
    return crypto.randomUUID();
  }

  /**
   * Get current timestamp in ISO format
   */
  getCurrentTimestamp(): string {
    return new Date().toISOString();
  }
}