import { test, expect } from '@playwright/test';
test('Profile complete', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  // Go to login page
  await page.goto('https://dev.kredsafe.net/login');

  // Fill in the login form
  await page.locator('input[name="email"]').fill('hrd14566@yopmail.com');
  await page.locator('input[name="password"]').fill('Nilesh@2025');

  // Click the login button
  await page.locator('#id_frm_submit').click();

  // Wait for the next page to load completely
  await page.waitForLoadState('load');
    await page.goto('https://dev.kredsafe.net/user/internship');
      await page.waitForLoadState('load');

       const submitLocator = page.locator('//*[@id="id_frm_submit"]');
const clearLocator = page.locator('//a[@href="https://dev.kredsafe.net/admin/home" and normalize-space(text())="click here"]');


  // Wait until the element is visible
  await submitLocator.waitFor({ state: 'visible' });

  // Click using JavaScript for Submit button
  await page.evaluate((el) => el.click(), await submitLocator.elementHandle());
      await page.waitForLoadState('load');

  // Click using JavaScript for Clear link
   // await clearLocator.waitFor({ state: 'visible' });
await page.waitForLoadState('networkidle'); 
  await page.waitForTimeout(7000);

await page.evaluate(() => {
  const el = document.evaluate(
    '//a[contains(@href, "/admin/home") and contains(normalize-space(.), "click here")]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  
  if (el) el.click();

});
    console.log(' Click here clicked ');

});
