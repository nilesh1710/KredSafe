import { test, expect } from '@playwright/test';

test('Verify Change password by data driven csv', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('h29@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
  await page.waitForTimeout(5000);
await page.goto('https://dev.kredsafe.net/user/subscription/dashboard');
 await page.waitForTimeout(5000);
  await page.locator("//button[span[text()=' Cancel Subscription']]").click();

  // Step 4: Wait for modal to appear
  await page.locator('#cancelSubscriptionModal').waitFor({ state: 'visible', timeout: 5000 });

  // Step 5: Check if the textarea is actually there
  const textarea = page.locator('#cancel_reason');
  await expect(textarea).toBeVisible();

  // Step 6: Fill and submit
  await textarea.fill('testsubcancle');
  await page.locator('#cancel-sub-btn').click();

});