import { test, expect } from '@playwright/test';
import { clearScreenDown } from 'readline';

test('Verify Subscription display', async ({ page }) => {
  // Set test timeout (use test.setTimeout outside the test body)
  test.setTimeout(60000);

  await page.goto('https://dev.kredsafe.net/');
  await page.waitForLoadState('load');

  // Login
  await page.locator('//input[@name="email"]').fill('sep10@yopmail.com');
  await page.locator('//input[@name="password"]').fill('Nilesh@2025');
  await page.locator('//*[@id="id_frm_submit"]').click();

  // Navigate to subscription dashboard
  await page.goto('https://dev.kredsafe.net/user/subscription/dashboard');
  await page.waitForLoadState('load');

  // Wait until network is idle (all requests finished)
  await page.waitForLoadState('networkidle');
await page.evaluate(() => {
  window.scrollBy(0, window.innerHeight);
});

await page.waitForTimeout(2000);


  const subscriptionValue = await page.textContent('span.pill.green');
  console.log('Subscription - ' + subscriptionValue.trim());

  const formsPacketValue = await page.textContent('span.pill.yellow');
  console.log('Forms and Packet - ' + formsPacketValue.trim());

  const totalValue = await page.textContent('span.pill.red');
  console.log('Total - ' + totalValue.trim());
});
