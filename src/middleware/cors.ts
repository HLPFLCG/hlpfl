import { Context, Next } from 'hono';

export interface CorsOptions {
  origin?: string | string[];
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

/**
 * CORS middleware
 */
export function corsMiddleware(options: CorsOptions = {}) {
  const {
    origin = '*',
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders = ['Content-Type', 'Authorization'],
    exposedHeaders = [],
    credentials = true,
    maxAge = 86400,
  } = options;

  return async (c: Context, next: Next) => {
    const requestOrigin = c.req.header('Origin');

    // Set CORS headers
    if (Array.isArray(origin)) {
      if (requestOrigin && origin.includes(requestOrigin)) {
        c.header('Access-Control-Allow-Origin', requestOrigin);
      }
    } else if (origin === '*') {
      c.header('Access-Control-Allow-Origin', '*');
    } else {
      c.header('Access-Control-Allow-Origin', origin);
    }

    if (credentials) {
      c.header('Access-Control-Allow-Credentials', 'true');
    }

    c.header('Access-Control-Allow-Methods', methods.join(', '));
    c.header('Access-Control-Allow-Headers', allowedHeaders.join(', '));

    if (exposedHeaders.length > 0) {
      c.header('Access-Control-Expose-Headers', exposedHeaders.join(', '));
    }

    c.header('Access-Control-Max-Age', maxAge.toString());

    // Handle preflight requests
    if (c.req.method === 'OPTIONS') {
      return c.text('', 204);
    }

    await next();
  };
}