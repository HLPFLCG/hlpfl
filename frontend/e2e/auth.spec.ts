import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display landing page', async ({ page }) => {
    await expect(page).toHaveTitle(/HLPFL/);
    await expect(page.getByRole('heading', { name: /HLPFL/i })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.getByRole('link', { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible();
  });

  test('should show validation errors on empty login form', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Check for validation messages
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test('should show validation errors on empty register form', async ({ page }) => {
    await page.goto('/register');
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Check for validation messages
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });

  test('should validate password strength on register', async ({ page }) => {
    await page.goto('/register');
    await page.getByLabel(/^password$/i).fill('weak');
    
    // Should show weak password indicator
    await expect(page.getByText(/weak/i)).toBeVisible();
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.goto('/login');
    const passwordInput = page.getByLabel(/password/i);
    const toggleButton = page.getByRole('button', { name: /show password/i });
    
    // Initially should be password type
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click toggle
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click again to hide
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

test.describe('Accessibility', () => {
  test('landing page should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
    
    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('login page should be keyboard navigable', async ({ page }) => {
    await page.goto('/login');
    
    // Tab through form elements
    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/email/i)).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/password/i)).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /sign in/i })).toBeFocused();
  });
});