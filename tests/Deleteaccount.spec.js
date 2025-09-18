import { test, expect } from '@playwright/test';

test('login and open meeting link', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login');

  // Fill in credentials
  await page.locator('[name="username"]').fill('ats434@yopmail.com');
  await page.locator('[name="password"]').fill('surecafe');

  // Click Login button and wait for navigation to complete
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);

  // Click the 'SM' link by evaluating in page context
  await page.evaluate(() => {
    const smLink = Array.from(document.querySelectorAll('a')).find(link => link.textContent.trim() === 'SM');
    if (smLink) smLink.click();
  });

  // Wait 2 seconds for navigation or UI update after clicking SM link
  await page.waitForTimeout(2000);

  // Locate and click the 'Delete Account' link
  const deleteAccountLink = page.locator('//a[normalize-space(text())="Delete Account"]');
  await deleteAccountLink.scrollIntoViewIfNeeded();
  await deleteAccountLink.click();
});
