import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  //Login 
 await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login');
 await page.locator('[name="username"]').fill('ats434@yopmail.com');
await page.locator('[name="password"]').fill('surecafe');
  await page.getByRole('button', { name: 'Login' }).click();
  //login succeffuly
   //login succeffuly
});