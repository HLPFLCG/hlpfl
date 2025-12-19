import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['artist', 'manager', 'team_member']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
  website: z.string().url().optional(),
});

// Post validation schemas
export const createPostSchema = z.object({
  content: z.string().min(1, 'Content is required').max(5000),
  platforms: z.array(z.enum(['twitter', 'linkedin', 'facebook', 'instagram'])),
  scheduled_for: z.string().datetime().optional(),
  media_ids: z.array(z.string()).optional(),
  status: z.enum(['draft', 'scheduled', 'published']).default('draft'),
});

export const updatePostSchema = z.object({
  content: z.string().min(1).max(5000).optional(),
  platforms: z.array(z.enum(['twitter', 'linkedin', 'facebook', 'instagram'])).optional(),
  scheduled_for: z.string().datetime().optional(),
  media_ids: z.array(z.string()).optional(),
  status: z.enum(['draft', 'scheduled', 'published']).optional(),
});

// Social account validation schemas
export const connectSocialAccountSchema = z.object({
  platform: z.enum(['twitter', 'linkedin', 'facebook', 'instagram']),
  access_token: z.string().min(1),
  refresh_token: z.string().optional(),
  platform_user_id: z.string().min(1),
  platform_username: z.string().min(1),
  expires_at: z.string().datetime().optional(),
});

// Team validation schemas
export const createTeamSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
  description: z.string().max(500).optional(),
});

export const inviteTeamMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'editor', 'viewer']),
});

// Media validation schemas
export const uploadMediaSchema = z.object({
  filename: z.string().min(1),
  content_type: z.string().min(1),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
});

// Financial validation schemas
export const recordRevenueSchema = z.object({
  artist_id: z.string().uuid(),
  amount: z.number().positive('Amount must be positive'),
  source: z.string().min(1),
  date: z.string().datetime(),
  description: z.string().optional(),
});

export const recordExpenseSchema = z.object({
  artist_id: z.string().uuid(),
  amount: z.number().positive('Amount must be positive'),
  category: z.string().min(1),
  date: z.string().datetime(),
  description: z.string().optional(),
  approved: z.boolean().default(false),
});

// Validation helper function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return { success: false, errors: ['Validation failed'] };
  }
}