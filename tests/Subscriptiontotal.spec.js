import { test, expect } from '@playwright/test';

test('Verify Subscription display', async ({ page }) => {
    test.setTimeout(90000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('swapj@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();


});// Auto-update on Fri Oct  3 05:39:06 UTC 2025
