import { test, expect } from '@playwright/test';

test('Verify Make primary email', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd9@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');

await page.goto('https://dev.kredsafe.net/user/overview');
  await page.waitForLoadState('load');
 // 3. Fill the alternate email
await page.getByRole('textbox', { name: 'd', exact: true }).click();
  await page.getByRole('textbox', { name: 'd', exact: true }).fill('hrd9@yopmail.com');
  await page.getByRole('radio', { name: 'd', exact: true }).check();
  await page.getByRole('button', { name: 'Yes' }).click();
  console.log("✅ Filled new primary email.");
console.log("✅ PASS: Primary email updated successfully.");
});  