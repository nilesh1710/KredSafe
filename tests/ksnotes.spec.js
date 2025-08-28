import { test, expect } from '@playwright/test';

test('Subscription cancellation request flow', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd786@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
  await page.goto('https://dev.kredsafe.net/user/subscription/dashboard');
await page.waitForLoadState('networkidle');

const cancellation = page.locator('xpath=//a[text()="Cancellation Requests"]');
await page.waitForTimeout(5000); 
//await cancellation.click();
await page.evaluate(() => {
  const xpath = '//a[text()="Cancellation Requests"]';
  const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const element = result.singleNodeValue;
  if (element) element.click();
});

await page.evaluate(() => window.scrollBy(0, 300));

const commentIcon = page.locator('xpath=(//i[@title="follow up"])[2]');
await page.waitForTimeout(5000); 
await page.evaluate(() => {
  const xpath = '(//i[@title="follow up"])[2]';
  const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const element = result.singleNodeValue;
  if (element) element.click();
});
});