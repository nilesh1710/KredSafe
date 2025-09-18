import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
 await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login');
 await page.locator('[name="username"]').fill('ats434@yopmail.com');
await page.locator('[name="password"]').fill('surecafe');
  await page.getByRole('button', { name: 'Login' }).click();
  //login 
  await page.waitForLoadState('load');
//wait for profile
 await page.goto('https://surecafe.tiuconsulting.us/frontend/profile/view');
   await page.waitForLoadState('networkidle');

await page.evaluate(() => {
  const clickByText = (tag, text) => {
    const elements = Array.from(document.querySelectorAll(tag));
    const el = elements.find(e => e.textContent.trim() === text);
    if (el) el.click();
  };

  const scrollAndClick = (el) => {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.click();
  };

  clickByText('a', 'Experience');
  scrollAndClick(Array.from(document.querySelectorAll('a')).find(e => e.textContent.trim() === 'Certification Process'));
  scrollAndClick(Array.from(document.querySelectorAll('a')).find(e => e.textContent.trim() === 'Additional Projects'));
  scrollAndClick(Array.from(document.querySelectorAll('a')).find(e => e.textContent.trim() === 'View Resume'));
  scrollAndClick(Array.from(document.querySelectorAll('a')).find(e => e.textContent.trim() === 'Education'));

  scrollAndClick(document.querySelector('img[src="assets/image/logo.svg"]'));
});
});
