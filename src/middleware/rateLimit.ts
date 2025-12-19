import { Context, Next } from 'hono';
import { RateLimitError } from '../utils/errors';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

/**
 * Simple in-memory rate limiter
 * For production, consider using Cloudflare Durable Objects or KV
 */
export class RateLimiter {
  private store: RateLimitStore = {};
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
    
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private cleanup() {
    const now = Date.now();
    for (const key in this.store) {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    }
  }

  check(identifier: string): boolean {
    const now = Date.now();
    const record = this.store[identifier];

    if (!record || record.resetTime < now) {
      // Create new record
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.config.windowMs,
      };
      return true;
    }

    if (record.count >= this.config.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  getInfo(identifier: string): { remaining: number; resetTime: number } {
    const record = this.store[identifier];
    const now = Date.now();

    if (!record || record.resetTime < now) {
      return {
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs,
      };
    }

    return {
      remaining: Math.max(0, this.config.maxRequests - record.count),
      resetTime: record.resetTime,
    };
  }
}

/**
 * Rate limiting middleware
 */
export function rateLimitMiddleware(limiter: RateLimiter) {
  return async (c: Context, next: Next) => {
    // Use IP address or user ID as identifier
    const user = c.get('user');
    const identifier = user?.userId || c.req.header('CF-Connecting-IP') || 'anonymous';

    const allowed = limiter.check(identifier);
    const info = limiter.getInfo(identifier);

    // Set rate limit headers
    c.header('X-RateLimit-Limit', limiter['config'].maxRequests.toString());
    c.header('X-RateLimit-Remaining', info.remaining.toString());
    c.header('X-RateLimit-Reset', Math.floor(info.resetTime / 1000).toString());

    if (!allowed) {
      throw new RateLimitError('Rate limit exceeded. Please try again later.');
    }

    await next();
  };
}

/**
 * Create rate limiter with default config
 */
export function createRateLimiter(maxRequests: number = 100, windowMs: number = 60000) {
  return new RateLimiter({ maxRequests, windowMs });
}