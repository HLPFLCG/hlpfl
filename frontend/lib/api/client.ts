import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Try to refresh token
          const refreshed = await this.refreshToken();
          if (refreshed) {
            // Retry the original request
            return this.client(error.config);
          } else {
            // Redirect to login
            this.clearTokens();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
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

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken,
      });

      const { accessToken } = response.data;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // Auth methods
  async register(data: { email: string; password: string; name: string; role?: string }) {
    const response = await this.client.post('/auth/register', data);
    if (response.data.accessToken && response.data.refreshToken) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
    }
    return response.data;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.client.post('/auth/login', data);
    if (response.data.accessToken && response.data.refreshToken) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
    }
    return response.data;
  }

  async logout() {
    try {
      await this.client.post('/auth/logout');
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await this.client.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(token: string, password: string) {
    const response = await this.client.post('/auth/reset-password', { token, password });
    return response.data;
  }

  // Posts methods
  async getPosts(params?: { page?: number; limit?: number; status?: string }) {
    const response = await this.client.get('/posts', { params });
    return response.data;
  }

  async getPost(id: string) {
    const response = await this.client.get(`/posts/${id}`);
    return response.data;
  }

  async createPost(data: any) {
    const response = await this.client.post('/posts', data);
    return response.data;
  }

  async updatePost(id: string, data: any) {
    const response = await this.client.put(`/posts/${id}`, data);
    return response.data;
  }

  async deletePost(id: string) {
    const response = await this.client.delete(`/posts/${id}`);
    return response.data;
  }

  async publishPost(id: string) {
    const response = await this.client.post(`/posts/${id}/publish`);
    return response.data;
  }

  // Media methods
  async uploadMedia(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.client.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getMedia(params?: { page?: number; limit?: number; type?: string }) {
    const response = await this.client.get('/media', { params });
    return response.data;
  }

  async deleteMedia(id: string) {
    const response = await this.client.delete(`/media/${id}`);
    return response.data;
  }

  // Analytics methods
  async getAnalyticsOverview(params?: { days?: number }) {
    const response = await this.client.get('/analytics/overview', { params });
    return response.data;
  }

  async getAnalyticsTimeline(params?: { days?: number; platform?: string }) {
    const response = await this.client.get('/analytics/timeline', { params });
    return response.data;
  }

  async getTopPosts(params?: { limit?: number; metric?: string }) {
    const response = await this.client.get('/analytics/top-posts', { params });
    return response.data;
  }

  // Financial methods
  async getFinancialDashboard(params?: { year?: number; month?: number }) {
    const response = await this.client.get('/financial/dashboard', { params });
    return response.data;
  }

  async getRevenue(params?: { page?: number; limit?: number }) {
    const response = await this.client.get('/financial/revenue', { params });
    return response.data;
  }

  async getExpenses(params?: { page?: number; limit?: number; approved?: boolean }) {
    const response = await this.client.get('/financial/expenses', { params });
    return response.data;
  }

  // Teams methods
  async getTeams() {
    const response = await this.client.get('/teams');
    return response.data;
  }

  async getTeam(id: string) {
    const response = await this.client.get(`/teams/${id}`);
    return response.data;
  }

  async createTeam(data: { name: string; description?: string }) {
    const response = await this.client.post('/teams', data);
    return response.data;
  }

  // AI methods
  async generateContent(data: { prompt: string; platform?: string; tone?: string }) {
    const response = await this.client.post('/ai/generate', data);
    return response.data;
  }

  async generateHashtags(data: { content: string; platform: string; count?: number }) {
    const response = await this.client.post('/ai/hashtags', data);
    return response.data;
  }

  async analyzeSentiment(content: string) {
    const response = await this.client.post('/ai/sentiment', { content });
    return response.data;
  }

  // Generic request method
  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }
}

export const apiClient = new APIClient();
export default apiClient;