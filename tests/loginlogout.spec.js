import { test, expect } from '@playwright/test';

test('Verify login logout', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd786@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');
 await page.getByRole('button', { name: 'Verify' }).click();
await page.evaluate(() => {
  const link = Array.from(document.querySelectorAll('a'))
    .find(el => el.textContent?.trim() === 'Dams Tom Dams Tom');
  if (link) link.click();
});  
await page.evaluate(() => {
  const link = Array.from(document.querySelectorAll('a'))
    .find(el => el.textContent?.trim() === 'Sign out');
  if (link) link.click();
});});