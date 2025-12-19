import { Context } from 'hono';
import { AppError, formatErrorResponse } from '../utils/errors';

/**
 * Global error handler middleware
 */
export function errorHandler(error: Error, c: Context) {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return c.json(formatErrorResponse(error), error.statusCode);
  }

  // Handle unknown errors
  return c.json(
    {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    },
    500
  );
}