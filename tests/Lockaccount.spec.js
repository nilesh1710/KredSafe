import { test, expect } from '@playwright/test';

test('Verify Restore Validation', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://dev.kredsafe.net/login');

  await page.locator('//input[@name="email"]').fill('sep9@yopmail.com');
  await page.locator('//input[@name="password"]').fill('Nilesh@20251');

  for (let i = 0; i < 6; i++) {
    await page.locator('//*[@id="id_frm_submit"]').click();
  }

  await page.waitForLoadState('networkidle');

  // Here: logging based on page content
  const bodyText = await page.locator('body').textContent();
  if (bodyText?.includes('Too many login attempts.')) {
    console.log("Yes Display Too many login attempts.");
  } else {
    console.log("Text not found: Too many login attempts.");
  }

  await expect(page.locator('body')).toContainText('Too many login attempts.');

  // Then try to go to dashboard (shouldn't allow)
  await page.goto('https://dev.kredsafe.net/user/subscription/dashboard');
  await page.waitForLoadState('networkidle');
});
