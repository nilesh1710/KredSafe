import { test, expect } from '@playwright/test';

test('login, navigate to SM, and logout', async ({ page }) => {
  await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login', { waitUntil: 'networkidle' });

   await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login');
 await page.locator('[name="username"]').fill('ats434@yopmail.com');
await page.locator('[name="password"]').fill('surecafe');
  await page.getByRole('button', { name: 'Login' }).click();

 await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle' }),
  page.evaluate(() => {
    const smLink = Array.from(document.querySelectorAll('a')).find(link => link.textContent.trim() === 'SM');
    if (smLink) smLink.click();
  }),
]);
//logout
await page.waitForTimeout(2000);

const logoutLink = page.locator('text=Log out');
await page.evaluate(() => {
  const logoutLink = Array.from(document.querySelectorAll('a')).find(link => link.textContent.trim() === 'Log out');
  if (logoutLink) logoutLink.click();
});

 
});
  