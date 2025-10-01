import { test, expect } from '@playwright/test';

test('Verify Subscription display', async ({ page }) => {
    test.setTimeout(90000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('swapj@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');
 await page.goto('https://dev.kredsafe.net/user/subscription/dashboard');
await page.waitForLoadState('networkidle');

  // Scroll down function
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));

  // Grab the subscription values by selectors
   const subscriptionValue = await page.textContent("span.pill.green");
  console.log("Subscription - " + subscriptionValue.trim());

  const formsPacketValue = await page.textContent("span.pill.yellow");
   console.log("Forms and Packet - " + formsPacketValue.trim());

  const totalValue = await page.textContent("span.pill.red");
   console.log("Total - " + totalValue.trim());

  //await browser.close();


});
