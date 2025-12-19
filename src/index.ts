import { Hono } from 'hono';
import { DatabaseService } from './utils/database';
import { JWTService } from './utils/jwt';
import { PasswordService } from './utils/password';
import { AIService } from './services/ai';
import { SchedulerService } from './services/scheduler';
import { createAuthRoutes } from './routes/auth';
import { createUserRoutes } from './routes/users';
import { createPostRoutes } from './routes/posts';
import { createSocialRoutes } from './routes/social';
import { createMediaRoutes } from './routes/media';
import { createAnalyticsRoutes } from './routes/analytics';
import { createTeamRoutes } from './routes/teams';
import { createFinancialRoutes } from './routes/financial';
import { createAIRoutes } from './routes/ai';
import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware, errorLoggerMiddleware } from './middleware/logger';
import { rateLimitMiddleware, createRateLimiter } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';

// Define environment bindings
export interface Env {
  DB: D1Database;
  R2: R2Bucket;
  JWT_SECRET: string;
  AI_API_KEY?: string;
}

const app = new Hono<{ Bindings: Env }>();

// Global middleware
app.use('*', corsMiddleware({
  origin: ['https://portal.hlpfl.org', 'https://biobetter.hlpfl.com', 'http://localhost:3000'],
  credentials: true,
}));

app.use('*', loggerMiddleware());
app.use('*', errorLoggerMiddleware());

// Rate limiting
const rateLimiter = createRateLimiter(100, 60000); // 100 requests per minute
app.use('*', rateLimitMiddleware(rateLimiter));

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'HLPFL Social Media Management API',
    version: '1.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Initialize services and mount routes
app.all('*', async (c, next) => {
  // Initialize services
  const db = new DatabaseService(c.env.DB);
  const jwtService = new JWTService(c.env.JWT_SECRET);
  const passwordService = new PasswordService();
  const aiService = new AIService(c.env.AI_API_KEY || '');
  const schedulerService = new SchedulerService(db);

  // Create route handlers
  const authRoutes = createAuthRoutes(db, jwtService, passwordService);
  const userRoutes = createUserRoutes(db, jwtService);
  const postRoutes = createPostRoutes(db, jwtService);
  const socialRoutes = createSocialRoutes(db, jwtService);
  const mediaRoutes = createMediaRoutes(db, jwtService);
  const analyticsRoutes = createAnalyticsRoutes(db, jwtService);
  const teamRoutes = createTeamRoutes(db, jwtService);
  const financialRoutes = createFinancialRoutes(db, jwtService);
  const aiRoutes = createAIRoutes(aiService, jwtService);

  // Mount routes
  app.route('/auth', authRoutes);
  app.route('/users', userRoutes);
  app.route('/posts', postRoutes);
  app.route('/social', socialRoutes);
  app.route('/media', mediaRoutes);
  app.route('/analytics', analyticsRoutes);
  app.route('/teams', teamRoutes);
  app.route('/financial', financialRoutes);
  app.route('/ai', aiRoutes);

  await next();
});

// Global error handler
app.onError(errorHandler);

// 404 handler
app.notFound((c) => {
  return c.json({
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found',
    },
  }, 404);
});

export default app;