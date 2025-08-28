import { test, expect } from '@playwright/test';

test('Verify Work experience', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd1@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');
 await page.goto('https://dev.kredsafe.net/user/internship');
  await page.waitForLoadState('networkidle');
// Fill job title
const jobTitle = page.locator('//input[@name="internship[0][job_title]"]');
await jobTitle.waitFor({ state: 'visible' });
await jobTitle.fill('Lead');

// Fill employer
const employer = page.locator('//input[@name="internship[0][employer]"]');
await employer.waitFor({ state: 'visible' });
await employer.fill('TIU');

// Select country
const countryDropdown = page.locator('//select[@class="autoupdate country"]');
await countryDropdown.waitFor({ state: 'visible' });
await countryDropdown.selectOption({ label: 'United States' });

// Select state
const stateList = page.locator('//select[@id="state-list_0"]');
await stateList.waitFor({ state: 'visible' });
await stateList.selectOption({ label: 'Alabama' });

// Fill city
const cityInput = page.locator('//input[@name="internship[0][city]"]');
await cityInput.waitFor({ state: 'visible' });
await cityInput.fill('Thanda');

// Wait a few seconds if needed (not best practice, but kept per your original)
await page.waitForTimeout(3000);

// Select start month & year
await page.locator('//select[@id="start_month_0"]').selectOption({ label: 'Jan' });
await page.locator('//select[@id="we_start_year_identity_0"]').selectOption({ label: '2010' });

// Select end month & year
await page.locator('//select[@id="end_month_0"]').selectOption({ label: 'Jan' });
await page.locator('//select[@id="we_end_year_identity_0"]').selectOption({ label: '2019' });

// Click "Save and Continue"
const saveAndContinueBtn = page.locator('//*[@id="id_frm_submit"]');
await saveAndContinueBtn.scrollIntoViewIfNeeded();
await saveAndContinueBtn.waitFor({ state: 'visible' });
await page.evaluate(el => el.click(), await saveAndContinueBtn.elementHandle());

// Optional wait after submission
  await page.waitForURL('https://dev.kredsafe.net/user/residencies', { timeout: 15000 });
await page.waitForLoadState('networkidle');


});