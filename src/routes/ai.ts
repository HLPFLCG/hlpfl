import { Hono } from 'hono';
import { AIService } from '../services/ai';
import { ValidationError } from '../utils/errors';
import { authMiddleware } from '../middleware/auth';
import { JWTService } from '../utils/jwt';

export function createAIRoutes(aiService: AIService, jwtService: JWTService) {
  const ai = new Hono();

  // All routes require authentication
  ai.use('*', authMiddleware(jwtService));

  /**
   * POST /ai/generate
   * Generate content using AI
   */
  ai.post('/generate', async (c) => {
    const body = await c.req.json();
    const { prompt, platform, tone, maxLength } = body;

    if (!prompt) {
      throw new ValidationError('Prompt is required');
    }

    const content = await aiService.generateContent({
      prompt,
      platform,
      tone,
      maxLength,
    });

    return c.json({ content });
  });

  /**
   * POST /ai/hashtags
   * Generate hashtag suggestions
   */
  ai.post('/hashtags', async (c) => {
    const body = await c.req.json();
    const { content, platform, count } = body;

    if (!content || !platform) {
      throw new ValidationError('Content and platform are required');
    }

    const hashtags = await aiService.generateHashtags({
      content,
      platform,
      count,
    });

    return c.json({ hashtags });
  });

  /**
   * POST /ai/caption
   * Generate caption suggestions
   */
  ai.post('/caption', async (c) => {
    const body = await c.req.json();
    const { imageDescription, context, platform, tone } = body;

    if (!platform) {
      throw new ValidationError('Platform is required');
    }

    const captions = await aiService.generateCaption({
      imageDescription,
      context,
      platform,
      tone,
    });

    return c.json({ captions });
  });

  /**
   * POST /ai/optimize-time
   * Get optimal posting times
   */
  ai.post('/optimize-time', async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const { platform, historicalData } = body;

    if (!platform) {
      throw new ValidationError('Platform is required');
    }

    const optimization = await aiService.optimizePostingTime({
      userId: user.userId,
      platform,
      historicalData,
    });

    return c.json(optimization);
  });

  /**
   * POST /ai/sentiment
   * Analyze content sentiment
   */
  ai.post('/sentiment', async (c) => {
    const body = await c.req.json();
    const { content } = body;

    if (!content) {
      throw new ValidationError('Content is required');
    }

    const analysis = await aiService.analyzeSentiment(content);

    return c.json(analysis);
  });

  /**
   * POST /ai/variations
   * Generate content variations
   */
  ai.post('/variations', async (c) => {
    const body = await c.req.json();
    const { content, count } = body;

    if (!content) {
      throw new ValidationError('Content is required');
    }

    const variations = await aiService.generateVariations(content, count);

    return c.json({ variations });
  });

  /**
   * POST /ai/improve
   * Get content improvement suggestions
   */
  ai.post('/improve', async (c) => {
    const body = await c.req.json();
    const { content, platform } = body;

    if (!content || !platform) {
      throw new ValidationError('Content and platform are required');
    }

    const improvements = await aiService.suggestImprovements(content, platform);

    return c.json(improvements);
  });

  return ai;
}