import { test, expect } from '@playwright/test';

const testData = [
  { email: 'user1@yopmail.com', password: 'pass1' },
  { email: 'user2@yopmail.com', password: 'pass2' },
  { email: 'hrd786@yopmail.com', password: 'Nilesh@2025' },
];

test.describe('Login tests - Data Driven', () => {
  testData.forEach(({ email, password }) => {
    test(`Login with ${email}`, async ({ page }) => {
          test.setTimeout(60000); // 60 seconds

      await page.goto('https://dev.kredsafe.net/login');

      // Use clear, Playwright-style selectors instead of XPath where possible
      await page.locator('input[name="email"]').fill(email);
      await page.locator('input[name="password"]').fill(password);
      await page.locator('#id_frm_submit').click();

      // Example assertion: check if login redirected to dashboard
      await expect(page).toHaveURL(/dashboard|home|profile/); // Adjust regex as needed
    });
  });
});
