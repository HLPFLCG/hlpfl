/**
 * API Types
 * Comprehensive TypeScript types for API requests and responses
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'artist' | 'user';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Post types
export interface Post {
  id: string;
  userId: string;
  content: string;
  platforms: string[];
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  mediaIds?: string[];
  hashtags?: string[];
  mentions?: string[];
  analytics?: PostAnalytics;
  createdAt: string;
  updatedAt: string;
}

export interface PostAnalytics {
  impressions: number;
  engagements: number;
  clicks: number;
  shares: number;
  likes: number;
  comments: number;
}

export interface CreatePostRequest {
  content: string;
  platforms: string[];
  scheduledFor?: string;
  mediaIds?: string[];
  hashtags?: string[];
  mentions?: string[];
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  status?: Post['status'];
}

// Media types
export interface Media {
  id: string;
  userId: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  mimeType: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Analytics types
export interface AnalyticsOverview {
  totalPosts: number;
  totalImpressions: number;
  totalEngagements: number;
  engagementRate: number;
  topPlatform: string;
  growth: {
    posts: number;
    impressions: number;
    engagements: number;
  };
}

export interface TimelineData {
  date: string;
  impressions: number;
  engagements: number;
  posts: number;
}

export interface TopPost extends Post {
  score: number;
}

// Financial types
export interface FinancialDashboard {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  commission: number;
  artistShare: number;
  revenueByMonth: MonthlyRevenue[];
  expensesByCategory: ExpenseCategory[];
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
}

export interface Revenue {
  id: string;
  userId: string;
  amount: number;
  source: string;
  description?: string;
  date: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description?: string;
  approved: boolean;
  date: string;
  createdAt: string;
}

// Team types
export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  user: User;
  joinedAt: string;
}

// AI types
export interface GenerateContentRequest {
  prompt: string;
  platform?: string;
  tone?: 'professional' | 'casual' | 'friendly' | 'formal';
  length?: 'short' | 'medium' | 'long';
}

export interface GenerateContentResponse {
  content: string;
  suggestions: string[];
}

export interface GenerateHashtagsRequest {
  content: string;
  platform: string;
  count?: number;
}

export interface GenerateHashtagsResponse {
  hashtags: string[];
  trending: string[];
}

export interface SentimentAnalysisResponse {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Error types
export interface APIError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Social Account types
export interface SocialAccount {
  id: string;
  userId: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  accountId: string;
  username: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  status: 'active' | 'expired' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface ConnectSocialAccountRequest {
  platform: string;
  code: string;
  redirectUri: string;
}