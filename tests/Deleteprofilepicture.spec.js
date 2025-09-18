import { test, expect } from '@playwright/test';

test('delete profile picture no waits', async ({ page }) => {
  await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login');

  // Fill login
  await page.locator('input[name="username"]').fill('ats434@yopmail.com');
  await page.locator('input[name="password"]').fill('surecafe');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard
  await page.goto('https://surecafe.tiuconsulting.us/frontend/profile/dashboard');
  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(1000); // wait 10 seconds
//const icon = page.locator('//*[@id="home"]/form/div/div[1]/span[1]/i').first();

await page.evaluate(() => {
  const xpath = '(//*[@id="home"]/form/div/div[1]/span[1]/i)';
  const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const element = result.singleNodeValue;
  if (element) element.click();
});
});