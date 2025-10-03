import { test, expect } from '@playwright/test';

test('Verify Subscription display', async ({ page }) => {
    test.setTimeout(90000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('swapj@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');


  //await browser.close();


});
// Auto-update on Fri Oct  3 09:45:04 UTC 2025
