import { test, expect } from '@playwright/test';

test('Verify Restore Validation', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('sep9@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');
  await page.goto('https://dev.kredsafe.net/user/education');
await page.waitForLoadState('networkidle');
const  archiveButton = page.locator("xpath=//button[@arch_section='education' and contains(@class, 'we_arch_show') and @title='View Archive Education Items']");

await archiveButton.waitFor({ state: 'visible' });
await archiveButton.click(); // waits for element to be visible & clickable by default


});