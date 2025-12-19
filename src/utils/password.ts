/**
 * Password hashing and verification utilities
 * Uses Web Crypto API available in Cloudflare Workers
 */

export class PasswordService {
  private encoder = new TextEncoder();

  /**
   * Hash a password using PBKDF2
   */
  async hashPassword(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const passwordBuffer = this.encoder.encode(password);

    const key = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      key,
      256
    );

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const saltArray = Array.from(salt);

    // Combine salt and hash
    const combined = saltArray.concat(hashArray);
    return btoa(String.fromCharCode(...combined));
  }

  /**
   * Verify a password against a hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const combined = Uint8Array.from(atob(hash), c => c.charCodeAt(0));
      const salt = combined.slice(0, 16);
      const originalHash = combined.slice(16);

      const passwordBuffer = this.encoder.encode(password);

      const key = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      );

      const hashBuffer = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        key,
        256
      );

      const newHash = new Uint8Array(hashBuffer);

      // Compare hashes
      if (newHash.length !== originalHash.length) return false;
      
      let match = true;
      for (let i = 0; i < newHash.length; i++) {
        if (newHash[i] !== originalHash[i]) {
          match = false;
        }
      }

      return match;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate a random token for password reset
   */
  generateResetToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}