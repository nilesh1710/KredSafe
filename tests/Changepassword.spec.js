import { test, expect } from '@playwright/test';

test('Verify Change password', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('ts1234@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2030');
await page.locator('//*[@id="id_frm_submit"]').click();
  await page.waitForTimeout(5000);
await page.goto('https://dev.kredsafe.net/user/change-password');

  await page.waitForTimeout(5000);
await page.locator('//*[@id="oldpassword"]').fill('Nilesh@2030');

// Fill new password
await page.locator('//*[@id="passwordch"]').fill('Nilesh@2025');

// Fill confirm new password
await page.locator('//*[@id="password_conf"]').fill('Nilesh@2025');

// Click submit button
await page.locator('//*[@id="id_frm_submit"]').click();

});