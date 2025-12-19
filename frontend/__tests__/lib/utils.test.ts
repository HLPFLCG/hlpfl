import {
  cn,
  formatDate,
  formatRelativeTime,
  formatNumber,
  formatCurrency,
  formatPercentage,
  truncate,
  isEmpty,
  generateId,
  getFileExtension,
  formatFileSize,
  isValidEmail,
  isValidUrl,
  getInitials,
  stringToColor,
} from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
      expect(cn('px-4', 'px-8')).toBe('px-8');
      expect(cn('text-red-500', { 'text-blue-500': true })).toBe('text-blue-500');
    });
  });

  describe('formatDate', () => {
    it('should format date in short format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date, 'short');
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    it('should format date in long format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date, 'long');
      expect(formatted).toContain('January');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });
  });

  describe('formatRelativeTime', () => {
    it('should return "just now" for recent dates', () => {
      const now = new Date();
      expect(formatRelativeTime(now)).toBe('just now');
    });

    it('should return minutes ago', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      expect(formatRelativeTime(date)).toBe('5 minutes ago');
    });

    it('should return hours ago', () => {
      const date = new Date(Date.now() - 2 * 60 * 60 * 1000);
      expect(formatRelativeTime(date)).toBe('2 hours ago');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(123)).toBe('123');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(formatPercentage(50)).toBe('50.0%');
      expect(formatPercentage(33.333, 2)).toBe('33.33%');
    });
  });

  describe('truncate', () => {
    it('should truncate long text', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Hi', 5)).toBe('Hi');
    });
  });

  describe('isEmpty', () => {
    it('should detect empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('  ')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe('generateId', () => {
    it('should generate random IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).toHaveLength(16);
      expect(id2).toHaveLength(16);
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs of specified length', () => {
      const id = generateId(32);
      expect(id).toHaveLength(32);
    });
  });

  describe('getFileExtension', () => {
    it('should extract file extension', () => {
      expect(getFileExtension('document.pdf')).toBe('pdf');
      expect(getFileExtension('image.jpg')).toBe('jpg');
      expect(getFileExtension('archive.tar.gz')).toBe('gz');
    });
  });

  describe('formatFileSize', () => {
    it('should format file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });
  });

  describe('isValidEmail', () => {
    it('should validate email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@invalid.com')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should validate URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('invalid')).toBe(false);
      expect(isValidUrl('not a url')).toBe(false);
    });
  });

  describe('getInitials', () => {
    it('should extract initials from names', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Jane Smith')).toBe('JS');
      expect(getInitials('Single')).toBe('SI');
    });
  });

  describe('stringToColor', () => {
    it('should generate consistent colors for strings', () => {
      const color1 = stringToColor('test');
      const color2 = stringToColor('test');
      const color3 = stringToColor('different');

      expect(color1).toBe(color2);
      expect(color1).not.toBe(color3);
      expect(color1).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});