import fs from 'fs';
import { test, expect } from '@playwright/test';

// Define environment details
const envDetails = `User=Nilesh
Machine=Laptop
OS=Windows 11
Browser=Chromium
BaseURL=https://surecafe.tiuconsulting.us
Department=QA`;

// Write environment details before tests run
//fs.writeFileSync('allure-results/environment.properties', envDetails);
test('test', async ({ page }) => {
  await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login');
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill('ats434@yopmail.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('surecafe');
  await page.getByRole('button', { name: 'Login' }).click();
   // Wait for and click Profile
  const profileLink = page.getByRole('link', { name: /profile/i });
await page.waitForLoadState('load', { timeout: 20000 }); // 10 seconds
  await profileLink.click();
  await page.waitForLoadState('load', { timeout: 20000 }); // 10 seconds

  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('load', { timeout: 20000 }); // 10 seconds

  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('load', { timeout: 20000 }); // 10 seconds

  await page.getByRole('button', { name: 'Submit' }).click();
});