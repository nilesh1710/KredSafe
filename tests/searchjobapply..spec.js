import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://surecafe.tiuconsulting.us/frontend/');
  await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login');
 await page.locator('[name="username"]').fill('ats434@yopmail.com');
await page.locator('[name="password"]').fill('surecafe');
  await page.getByRole('button', { name: 'Login' }).click();
  //login succeffuly
// Locate the search input field and ensure it's visible
  const searchInput = page.locator('input[type="text"]:visible');
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  // Fill in the search field with the job title
  await searchInput.fill('Laravel Programmer');

  // Locate and click on the 'Laravel Programmer' job link
await page.evaluate(() => {
  const xpath = `//a[text()="Laravel Programmer"]`;
  const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const element = result.singleNodeValue;
  if (element) element.click();
})


const logo = page.locator('img[src="assets/image/logo.svg"]');
await logo.click();
await page.evaluate(() => {
  const xpath = '//img[@src="assets/image/logo.svg"]';
  const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const logo = result.singleNodeValue;
  if (logo) logo.click();
});

 const dataEngineerLink = page.locator('section.jobs-list a:has-text("Data engineer")');


  await logo.click();
});
