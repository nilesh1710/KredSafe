import { test, expect } from '@playwright/test';

test('Verify Work experience', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd1@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');
await page.goto('https://dev.kredsafe.net/user/work-experiences');
await page.waitForLoadState('networkidle');
 // Fill company name
  await page.locator('xpath=//*[@name="workexperience[0][company_name]"]').fill('Tiu');

  // Fill job title
  await page.locator('xpath=//*[@name="workexperience[0][job_title]"]').fill('Sr Doctor');

  // Select country
  await page.locator('select#country').selectOption({ label: 'United States' });

  // Wait for state dropdown to load/populate (if dynamic)
  const stateDropdown = page.locator('select#state-list_0');
  await stateDropdown.waitFor({ state: 'visible', timeout: 10000 });

  // Select state by value
  await stateDropdown.selectOption('AL'); // Alabama

  // Fill city
await page.locator('input[name="workexperience[0][city]"]').fill('NY');

  // Click "Currently Working" checkbox/radio using JavaScript
  await page.evaluate(() => {
    document.querySelector('#currently_working_status')?.click();
  });

  // Select start month
  await page.locator('select#start_month_0').selectOption({ label: 'Jan' });

  // Select start year
  await page.locator('select#we_start_year_identity_0').selectOption({ label: '2010' });

  // Scroll to and click submit using JavaScript
 const submitBtn = page.locator('xpath=//*[@id="id_frm_submit"]/span');
await submitBtn.waitFor({ state: 'attached', timeout: 10000 }); // safe wait
await submitBtn.scrollIntoViewIfNeeded();
await page.evaluate(el => el.click(), await submitBtn.elementHandle());
await page.waitForURL('https://dev.kredsafe.net/user/education', { timeout: 15000 });
await page.waitForLoadState('networkidle');
});