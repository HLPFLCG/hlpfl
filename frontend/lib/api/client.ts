import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import type {
  User,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  Media,
  AnalyticsOverview,
  TimelineData,
  TopPost,
  FinancialDashboard,
  Revenue,
  Expense,
  Team,
  GenerateContentRequest,
  GenerateContentResponse,
  GenerateHashtagsRequest,
  GenerateHashtagsResponse,
  SentimentAnalysisResponse,
  PaginatedResponse,
  PaginationParams,
  APIError,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

/**
 * API Client
 * Handles all API requests with automatic token refresh and error handling
 */
class APIClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle errors and token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<APIError>) => {
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && originalRequest) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;

            try {
              const refreshed = await this.refreshToken();
              if (refreshed) {
                this.isRefreshing = false;
                this.onTokenRefreshed(refreshed);
                this.refreshSubscribers = [];

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${refreshed}`;
                return this.client(originalRequest);
              }
            } catch (refreshError) {
              this.isRefreshing = false;
              this.clearTokens();
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
              return Promise.reject(refreshError);
            }
          }

          // Queue requests while refreshing token
          return new Promise((resolve) => {
            this.refreshSubscribers.push((token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(this.client(originalRequest));
            });
          });
        }

        // Handle other errors
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError<APIError>): APIError {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data?.message || 'An error occurred',
        code: error.response.data?.code,
        status: error.response.status,
        errors: error.response.data?.errors,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
      };
    } else {
      // Error setting up request
      return {
        message: error.message || 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
      };
    }
  }

  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  }

  private setTokens(accessToken: string, refreshToken: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return null;

      const response = await axios.post<{ accessToken: string }>(`${API_URL}/auth/refresh`, {
        refreshToken,
      });

      const { accessToken } = response.data;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // ==================== AUTH METHODS ====================

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/register', data);
    if (response.data.accessToken && response.data.refreshToken) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
    }
    return response.data;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', data);
    if (response.data.accessToken && response.data.refreshToken) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
    }
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get<User>('/auth/me');
    return response.data;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await this.client.post<{ message: string }>('/auth/forgot-password', {
      email,
    });
    return response.data;
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const response = await this.client.post<{ message: string }>('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  }

  // ==================== POSTS METHODS ====================

  async getPosts(params?: PaginationParams & { status?: string }): Promise<PaginatedResponse<Post>> {
    const response = await this.client.get<PaginatedResponse<Post>>('/posts', { params });
    return response.data;
  }

  async getPost(id: string): Promise<Post> {
    const response = await this.client.get<Post>(`/posts/${id}`);
    return response.data;
  }

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await this.client.post<Post>('/posts', data);
    return response.data;
  }

  async updatePost(id: string, data: UpdatePostRequest): Promise<Post> {
    const response = await this.client.put<Post>(`/posts/${id}`, data);
    return response.data;
  }

  async deletePost(id: string): Promise<{ message: string }> {
    const response = await this.client.delete<{ message: string }>(`/posts/${id}`);
    return response.data;
  }

  async publishPost(id: string): Promise<Post> {
    const response = await this.client.post<Post>(`/posts/${id}/publish`);
    return response.data;
  }

  // ==================== MEDIA METHODS ====================

  async uploadMedia(file: File): Promise<Media> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.client.post<Media>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getMedia(params?: PaginationParams & { type?: string }): Promise<PaginatedResponse<Media>> {
    const response = await this.client.get<PaginatedResponse<Media>>('/media', { params });
    return response.data;
  }

  async deleteMedia(id: string): Promise<{ message: string }> {
    const response = await this.client.delete<{ message: string }>(`/media/${id}`);
    return response.data;
  }

  // ==================== ANALYTICS METHODS ====================

  async getAnalyticsOverview(params?: { days?: number }): Promise<AnalyticsOverview> {
    const response = await this.client.get<AnalyticsOverview>('/analytics/overview', { params });
    return response.data;
  }

  async getAnalyticsTimeline(params?: {
    days?: number;
    platform?: string;
  }): Promise<TimelineData[]> {
    const response = await this.client.get<TimelineData[]>('/analytics/timeline', { params });
    return response.data;
  }

  async getTopPosts(params?: { limit?: number; metric?: string }): Promise<TopPost[]> {
    const response = await this.client.get<TopPost[]>('/analytics/top-posts', { params });
    return response.data;
  }

  // ==================== FINANCIAL METHODS ====================

  async getFinancialDashboard(params?: {
    year?: number;
    month?: number;
  }): Promise<FinancialDashboard> {
    const response = await this.client.get<FinancialDashboard>('/financial/dashboard', { params });
    return response.data;
  }

  async getRevenue(params?: PaginationParams): Promise<PaginatedResponse<Revenue>> {
    const response = await this.client.get<PaginatedResponse<Revenue>>('/financial/revenue', {
      params,
    });
    return response.data;
  }

  async getExpenses(
    params?: PaginationParams & { approved?: boolean }
  ): Promise<PaginatedResponse<Expense>> {
    const response = await this.client.get<PaginatedResponse<Expense>>('/financial/expenses', {
      params,
    });
    return response.data;
  }

  // ==================== TEAMS METHODS ====================

  async getTeams(): Promise<Team[]> {
    const response = await this.client.get<Team[]>('/teams');
    return response.data;
  }

  async getTeam(id: string): Promise<Team> {
    const response = await this.client.get<Team>(`/teams/${id}`);
    return response.data;
  }

  async createTeam(data: { name: string; description?: string }): Promise<Team> {
    const response = await this.client.post<Team>('/teams', data);
    return response.data;
  }

  // ==================== AI METHODS ====================

  async generateContent(data: GenerateContentRequest): Promise<GenerateContentResponse> {
    const response = await this.client.post<GenerateContentResponse>('/ai/generate', data);
    return response.data;
  }

  async generateHashtags(data: GenerateHashtagsRequest): Promise<GenerateHashtagsResponse> {
    const response = await this.client.post<GenerateHashtagsResponse>('/ai/hashtags', data);
    return response.data;
  }

  async analyzeSentiment(content: string): Promise<SentimentAnalysisResponse> {
    const response = await this.client.post<SentimentAnalysisResponse>('/ai/sentiment', {
      content,
    });
    return response.data;
  }

  // ==================== GENERIC REQUEST METHOD ====================

  async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }
}

export const apiClient = new APIClient();
export default apiClient;