import { test } from '@playwright/test';

// Define multiple test cases with only password fields
const testData = [
  {
    oldPassword: 'Nilesh@2030',
    newPassword: 'Nilesh@2025',
    confirmPassword: 'Nilesh@2025'
  },
  {
    oldPassword: 'Nilesh@2025',
    newPassword: 'Nilesh@2030',
    confirmPassword: 'Nilesh@2030'
  }
  // Add more test sets if needed
];

test.describe('Data-driven Change Password (with login)', () => {
  for (const data of testData) {
    test(`Change password from ${data.oldPassword} to ${data.newPassword}`, async ({ page }) => {
    test.setTimeout(60000); // 60 seconds

      // Step 1: Login
      await page.goto('https://dev.kredsafe.net/login');
      await page.locator('//input[@name="email"]').fill('ts1234@yopmail.com');
      await page.locator('//input[@name="password"]').fill('Nilesh@2025');
      await page.locator('//*[@id="id_frm_submit"]').click();
      await page.waitForTimeout(5000);

      // Step 2: Navigate to Change Password page
      await page.goto('https://dev.kredsafe.net/user/change-password');
      await page.waitForTimeout(2000);

      // Step 3: Fill password fields
      await page.locator('//*[@id="oldpassword"]').fill(data.oldPassword);
      await page.locator('//*[@id="passwordch"]').fill(data.newPassword);
      await page.locator('//*[@id="password_conf"]').fill(data.confirmPassword);

      // Step 4: Submit the form
      await page.locator('//*[@id="id_frm_submit"]').click();

      // Optional: Verify success message
      // await expect(page.locator('text=Password changed successfully')).toBeVisible();
    });
  }
});

