import { sign, verify } from 'hono/jwt';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export class JWTService {
  private secret: string;
  private accessTokenExpiry: number = 60 * 60; // 1 hour
  private refreshTokenExpiry: number = 60 * 60 * 24 * 7; // 7 days

  constructor(secret: string) {
    this.secret = secret;
  }

  async generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    return await sign(
      {
        ...payload,
        iat: now,
        exp: now + this.accessTokenExpiry,
      },
      this.secret
    );
  }

  async generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    return await sign(
      {
        ...payload,
        iat: now,
        exp: now + this.refreshTokenExpiry,
      },
      this.secret
    );
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    try {
      const payload = await verify(token, this.secret);
      return payload as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async generateTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }
}