import { Context, Next } from 'hono';
import { JWTService } from '../utils/jwt';
import { AuthenticationError, AuthorizationError } from '../utils/errors';

export interface AuthContext {
  userId: string;
  email: string;
  role: string;
}

/**
 * Authentication middleware - verifies JWT token
 */
export function authMiddleware(jwtService: JWTService) {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.substring(7);

    try {
      const payload = await jwtService.verifyToken(token);
      
      // Store user info in context
      c.set('user', {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      } as AuthContext);

      await next();
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  };
}

/**
 * Role-based authorization middleware
 */
export function requireRole(...allowedRoles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user') as AuthContext;

    if (!user) {
      throw new AuthenticationError('Authentication required');
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AuthorizationError('Insufficient permissions');
    }

    await next();
  };
}

/**
 * Optional authentication - doesn't throw if no token
 */
export function optionalAuth(jwtService: JWTService) {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      try {
        const payload = await jwtService.verifyToken(token);
        c.set('user', {
          userId: payload.userId,
          email: payload.email,
          role: payload.role,
        } as AuthContext);
      } catch (error) {
        // Ignore invalid tokens for optional auth
      }
    }

    await next();
  };
}