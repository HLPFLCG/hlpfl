/**
 * Validation utilities
 * Comprehensive validation functions for forms and user input
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true };
}

/**
 * Validate password strength
 */
export interface PasswordStrength {
  score: number; // 0-4
  label: 'weak' | 'fair' | 'good' | 'strong' | 'very strong';
  feedback: string[];
}

export function validatePassword(password: string): ValidationResult & { strength?: PasswordStrength } {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }

  const strength = calculatePasswordStrength(password);

  if (strength.score < 2) {
    return {
      isValid: false,
      error: 'Password is too weak. ' + strength.feedback.join(' '),
      strength,
    };
  }

  return { isValid: true, strength };
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const feedback: string[] = [];

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  else feedback.push('Use at least 12 characters for better security.');

  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push('Include both uppercase and lowercase letters.');
  }

  if (/\d/.test(password)) {
    score++;
  } else {
    feedback.push('Include at least one number.');
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score++;
  } else {
    feedback.push('Include at least one special character.');
  }

  // Common patterns check
  const commonPatterns = ['123', 'abc', 'password', 'qwerty'];
  const lowerPassword = password.toLowerCase();
  if (commonPatterns.some((pattern) => lowerPassword.includes(pattern))) {
    score = Math.max(0, score - 1);
    feedback.push('Avoid common patterns and words.');
  }

  // Normalize score to 0-4
  score = Math.min(4, Math.max(0, score - 1));

  const labels: PasswordStrength['label'][] = ['weak', 'fair', 'good', 'strong', 'very strong'];

  return {
    score,
    label: labels[score],
    feedback,
  };
}

/**
 * Validate name
 */
export function validateName(name: string): ValidationResult {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }

  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  if (name.length > 100) {
    return { isValid: false, error: 'Name must be less than 100 characters' };
  }

  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }

  return { isValid: true };
}

/**
 * Validate URL
 */
export function validateUrl(url: string): ValidationResult {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  if (digits.length < 10) {
    return { isValid: false, error: 'Phone number must be at least 10 digits' };
  }

  if (digits.length > 15) {
    return { isValid: false, error: 'Phone number is too long' };
  }

  return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: unknown, fieldName: string = 'This field'): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (typeof value === 'string' && value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (Array.isArray(value) && value.length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

/**
 * Validate minimum length
 */
export function validateMinLength(value: string, minLength: number, fieldName: string = 'This field'): ValidationResult {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validate maximum length
 */
export function validateMaxLength(value: string, maxLength: number, fieldName: string = 'This field'): ValidationResult {
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be less than ${maxLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validate number range
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string = 'This field'
): ValidationResult {
  if (value < min || value > max) {
    return {
      isValid: false,
      error: `${fieldName} must be between ${min} and ${max}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSizeMB: number): ValidationResult {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }

  return { isValid: true };
}

/**
 * Validate file type
 */
export function validateFileType(file: File, allowedTypes: string[]): ValidationResult {
  const fileType = file.type;
  const fileExtension = file.name.split('.').pop()?.toLowerCase();

  const isValidType = allowedTypes.some((type) => {
    if (type.includes('*')) {
      // Handle wildcards like 'image/*'
      const baseType = type.split('/')[0];
      return fileType.startsWith(baseType);
    }
    return fileType === type || fileExtension === type.replace('.', '');
  });

  if (!isValidType) {
    return {
      isValid: false,
      error: `File type must be one of: ${allowedTypes.join(', ')}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate date
 */
export function validateDate(date: string | Date, options?: {
  minDate?: Date;
  maxDate?: Date;
  allowPast?: boolean;
  allowFuture?: boolean;
}): ValidationResult {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Invalid date' };
  }

  const now = new Date();

  if (options?.minDate && dateObj < options.minDate) {
    return {
      isValid: false,
      error: `Date must be after ${options.minDate.toLocaleDateString()}`,
    };
  }

  if (options?.maxDate && dateObj > options.maxDate) {
    return {
      isValid: false,
      error: `Date must be before ${options.maxDate.toLocaleDateString()}`,
    };
  }

  if (options?.allowPast === false && dateObj < now) {
    return { isValid: false, error: 'Date cannot be in the past' };
  }

  if (options?.allowFuture === false && dateObj > now) {
    return { isValid: false, error: 'Date cannot be in the future' };
  }

  return { isValid: true };
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function validateCreditCard(cardNumber: string): ValidationResult {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');

  if (!/^\d+$/.test(cleaned)) {
    return { isValid: false, error: 'Card number must contain only digits' };
  }

  if (cleaned.length < 13 || cleaned.length > 19) {
    return { isValid: false, error: 'Invalid card number length' };
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Invalid card number' };
  }

  return { isValid: true };
}

/**
 * Validate multiple fields
 */
export function validateFields(
  fields: Record<string, unknown>,
  validators: Record<string, (value: unknown) => ValidationResult>
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  Object.entries(validators).forEach(([field, validator]) => {
    const result = validator(fields[field]);
    if (!result.isValid && result.error) {
      errors[field] = result.error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}