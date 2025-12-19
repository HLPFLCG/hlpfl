import {
  validateEmail,
  validatePassword,
  calculatePasswordStrength,
  validateName,
  validateUrl,
  validatePhone,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumberRange,
  validateFileSize,
  validateFileType,
  validateDate,
  validateCreditCard,
} from '@/lib/validation';

describe('Validation', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com').isValid).toBe(true);
      expect(validateEmail('user.name@domain.co.uk').isValid).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('').isValid).toBe(false);
      expect(validateEmail('invalid').isValid).toBe(false);
      expect(validateEmail('invalid@').isValid).toBe(false);
      expect(validateEmail('@invalid.com').isValid).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should accept strong passwords', () => {
      const result = validatePassword('StrongP@ssw0rd123');
      expect(result.isValid).toBe(true);
      expect(result.strength?.score).toBeGreaterThanOrEqual(2);
    });

    it('should reject weak passwords', () => {
      expect(validatePassword('').isValid).toBe(false);
      expect(validatePassword('weak').isValid).toBe(false);
      expect(validatePassword('12345678').isValid).toBe(false);
    });

    it('should require minimum length', () => {
      const result = validatePassword('short');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least 8 characters');
    });
  });

  describe('calculatePasswordStrength', () => {
    it('should rate weak passwords', () => {
      const strength = calculatePasswordStrength('password');
      expect(strength.score).toBeLessThan(2);
      expect(strength.label).toBe('weak');
    });

    it('should rate strong passwords', () => {
      const strength = calculatePasswordStrength('StrongP@ssw0rd123');
      expect(strength.score).toBeGreaterThanOrEqual(3);
      expect(['strong', 'very strong']).toContain(strength.label);
    });

    it('should provide feedback', () => {
      const strength = calculatePasswordStrength('password');
      expect(strength.feedback.length).toBeGreaterThan(0);
    });
  });

  describe('validateName', () => {
    it('should validate correct names', () => {
      expect(validateName('John Doe').isValid).toBe(true);
      expect(validateName("O'Brien").isValid).toBe(true);
      expect(validateName('Mary-Jane').isValid).toBe(true);
    });

    it('should reject invalid names', () => {
      expect(validateName('').isValid).toBe(false);
      expect(validateName('A').isValid).toBe(false);
      expect(validateName('John123').isValid).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(validateUrl('https://example.com').isValid).toBe(true);
      expect(validateUrl('http://localhost:3000').isValid).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('').isValid).toBe(false);
      expect(validateUrl('not a url').isValid).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      expect(validatePhone('1234567890').isValid).toBe(true);
      expect(validatePhone('+1 (234) 567-8900').isValid).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('').isValid).toBe(false);
      expect(validatePhone('123').isValid).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('should validate required fields', () => {
      expect(validateRequired('value').isValid).toBe(true);
      expect(validateRequired(123).isValid).toBe(true);
      expect(validateRequired([1, 2]).isValid).toBe(true);
    });

    it('should reject empty values', () => {
      expect(validateRequired('').isValid).toBe(false);
      expect(validateRequired(null).isValid).toBe(false);
      expect(validateRequired(undefined).isValid).toBe(false);
      expect(validateRequired([]).isValid).toBe(false);
    });
  });

  describe('validateMinLength', () => {
    it('should validate minimum length', () => {
      expect(validateMinLength('hello', 3).isValid).toBe(true);
      expect(validateMinLength('hi', 3).isValid).toBe(false);
    });
  });

  describe('validateMaxLength', () => {
    it('should validate maximum length', () => {
      expect(validateMaxLength('hi', 5).isValid).toBe(true);
      expect(validateMaxLength('hello world', 5).isValid).toBe(false);
    });
  });

  describe('validateNumberRange', () => {
    it('should validate number ranges', () => {
      expect(validateNumberRange(5, 1, 10).isValid).toBe(true);
      expect(validateNumberRange(0, 1, 10).isValid).toBe(false);
      expect(validateNumberRange(11, 1, 10).isValid).toBe(false);
    });
  });

  describe('validateFileSize', () => {
    it('should validate file sizes', () => {
      const smallFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      expect(validateFileSize(smallFile, 1).isValid).toBe(true);

      // Create a large file (mock)
      const largeFile = Object.create(File.prototype);
      Object.defineProperty(largeFile, 'size', { value: 10 * 1024 * 1024 }); // 10MB
      expect(validateFileSize(largeFile as File, 5).isValid).toBe(false);
    });
  });

  describe('validateFileType', () => {
    it('should validate file types', () => {
      const imageFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      expect(validateFileType(imageFile, ['image/jpeg', 'image/png']).isValid).toBe(true);

      const textFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      expect(validateFileType(textFile, ['image/jpeg', 'image/png']).isValid).toBe(false);
    });

    it('should handle wildcards', () => {
      const imageFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      expect(validateFileType(imageFile, ['image/*']).isValid).toBe(true);
    });
  });

  describe('validateDate', () => {
    it('should validate dates', () => {
      const validDate = new Date('2024-12-25');
      expect(validateDate(validDate).isValid).toBe(true);
    });

    it('should reject invalid dates', () => {
      expect(validateDate('invalid').isValid).toBe(false);
    });

    it('should validate date ranges', () => {
      const date = new Date('2024-06-15');
      const minDate = new Date('2024-01-01');
      const maxDate = new Date('2024-12-31');

      expect(validateDate(date, { minDate, maxDate }).isValid).toBe(true);
      expect(validateDate(date, { minDate: new Date('2024-07-01') }).isValid).toBe(false);
    });
  });

  describe('validateCreditCard', () => {
    it('should validate correct credit card numbers', () => {
      // Valid test card numbers
      expect(validateCreditCard('4532015112830366').isValid).toBe(true);
      expect(validateCreditCard('4532-0151-1283-0366').isValid).toBe(true);
    });

    it('should reject invalid credit card numbers', () => {
      expect(validateCreditCard('1234567890123456').isValid).toBe(false);
      expect(validateCreditCard('invalid').isValid).toBe(false);
      expect(validateCreditCard('123').isValid).toBe(false);
    });
  });
});