# Testing Guide

This document provides comprehensive information about testing in the HLPFL frontend application.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)

## Overview

We use a comprehensive testing strategy that includes:

- **Unit Tests**: Testing individual functions and components
- **Integration Tests**: Testing component interactions
- **E2E Tests**: Testing complete user flows
- **Visual Regression Tests**: Ensuring UI consistency

## Testing Stack

### Unit & Integration Testing

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation

### E2E Testing

- **Playwright**: Cross-browser end-to-end testing
- Supports Chrome, Firefox, Safari, and mobile browsers

### Code Coverage

- **Istanbul/NYC**: Code coverage reporting
- Target: 80% coverage across the board

## Running Tests

### Unit Tests

```bash
# Run tests in watch mode (development)
npm run test

# Run tests once (CI)
npm run test:ci

# Run tests with coverage
npm run test:ci
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e/auth.spec.ts
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

## Writing Tests

### Unit Test Example

```typescript
// __tests__/lib/utils.test.ts
import { formatCurrency } from '@/lib/utils';

describe('formatCurrency', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should handle negative numbers', () => {
    expect(formatCurrency(-100)).toBe('-$100.00');
  });
});
```

### Component Test Example

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('should render button text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### E2E Test Example

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });
});
```

## Test Coverage

### Coverage Thresholds

We maintain the following minimum coverage thresholds:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Viewing Coverage Reports

After running tests with coverage:

```bash
npm run test:ci
```

Open the coverage report:

```bash
open coverage/lcov-report/index.html
```

## Best Practices

### 1. Test Behavior, Not Implementation

❌ **Bad**: Testing implementation details

```typescript
it('should set state to loading', () => {
  const { result } = renderHook(() => useAuth());
  expect(result.current.isLoading).toBe(true);
});
```

✅ **Good**: Testing user-visible behavior

```typescript
it('should show loading spinner while authenticating', () => {
  render(<LoginForm />);
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(screen.getByLabelText('Loading')).toBeInTheDocument();
});
```

### 2. Use Semantic Queries

Prefer queries in this order:

1. `getByRole` - Most accessible
2. `getByLabelText` - Good for forms
3. `getByPlaceholderText` - Okay for forms
4. `getByText` - Good for non-interactive elements
5. `getByTestId` - Last resort

### 3. Test Accessibility

Always include accessibility checks:

```typescript
it('should be keyboard navigable', async () => {
  render(<Form />);
  
  await userEvent.tab();
  expect(screen.getByLabelText('Email')).toHaveFocus();
  
  await userEvent.tab();
  expect(screen.getByLabelText('Password')).toHaveFocus();
});
```

### 4. Mock External Dependencies

```typescript
// Mock API calls
jest.mock('@/lib/api/client', () => ({
  apiClient: {
    login: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
```

### 5. Clean Up After Tests

```typescript
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});
```

### 6. Use Descriptive Test Names

❌ **Bad**: Vague test names

```typescript
it('works', () => { ... });
it('test 1', () => { ... });
```

✅ **Good**: Descriptive test names

```typescript
it('should display error message when email is invalid', () => { ... });
it('should redirect to dashboard after successful login', () => { ... });
```

### 7. Test Edge Cases

Always test:

- Empty states
- Loading states
- Error states
- Boundary conditions
- Invalid inputs

### 8. Keep Tests Independent

Each test should be able to run independently:

```typescript
// ❌ Bad: Tests depend on each other
let user;

it('should create user', () => {
  user = createUser();
});

it('should update user', () => {
  updateUser(user); // Depends on previous test
});

// ✅ Good: Independent tests
it('should create user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});

it('should update user', () => {
  const user = createUser();
  const updated = updateUser(user);
  expect(updated).toBeDefined();
});
```

## Continuous Integration

Tests run automatically on:

- Every push to `main` or `develop` branches
- Every pull request
- Before deployment

### CI Pipeline

1. **Linting**: ESLint checks
2. **Type Checking**: TypeScript compilation
3. **Unit Tests**: Jest tests with coverage
4. **E2E Tests**: Playwright tests
5. **Build**: Production build verification
6. **Deploy**: Automatic deployment on success

## Debugging Tests

### Debug Unit Tests

```bash
# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Or use VS Code debugger with this configuration:
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal"
}
```

### Debug E2E Tests

```bash
# Run with headed browser
npx playwright test --headed

# Run with debug mode
npx playwright test --debug

# Run specific test
npx playwright test e2e/auth.spec.ts --debug
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Getting Help

If you have questions about testing:

1. Check this documentation
2. Review existing tests for examples
3. Ask in the team chat
4. Create an issue on GitHub

---

**Remember**: Good tests give you confidence to refactor and ship faster! 🚀