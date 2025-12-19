import { Context, Next } from 'hono';

export interface LogEntry {
  timestamp: string;
  method: string;
  path: string;
  status: number;
  duration: number;
  userId?: string;
  ip?: string;
  userAgent?: string;
}

/**
 * Logger middleware - logs all requests
 */
export function loggerMiddleware() {
  return async (c: Context, next: Next) => {
    const startTime = Date.now();
    const method = c.req.method;
    const path = c.req.path;
    const user = c.get('user');

    try {
      await next();
    } finally {
      const duration = Date.now() - startTime;
      const status = c.res.status;

      const logEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        method,
        path,
        status,
        duration,
        userId: user?.userId,
        ip: c.req.header('CF-Connecting-IP'),
        userAgent: c.req.header('User-Agent'),
      };

      // Log to console (in production, send to logging service)
      console.log(JSON.stringify(logEntry));
    }
  };
}

/**
 * Error logger middleware
 */
export function errorLoggerMiddleware() {
  return async (c: Context, next: Next) => {
    try {
      await next();
    } catch (error) {
      const errorLog = {
        timestamp: new Date().toISOString(),
        method: c.req.method,
        path: c.req.path,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        userId: c.get('user')?.userId,
      };

      console.error(JSON.stringify(errorLog));
      throw error;
    }
  };
}