import { test, expect } from '@playwright/test';

test('Login and apply to a job', async ({ page }) => {
  await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login');
  await page.locator('input[name="username"]').fill('ats434@yopmail.com');
  await page.locator('input[name="password"]').fill('surecafe');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
   await page.goto('https://surecafe.tiuconsulting.us/frontend/profile/candidate-jobs');
  await page.waitForLoadState('networkidle');
 const jobRow = page.getByRole('row', { name: /21 System Admin FTE\s*2025-03-24/ });
const applyButton = jobRow.getByRole('button', { name: 'Apply Now' });

await applyButton.waitFor({ state: 'visible', timeout: 60000 });


await applyButton.click();
});
