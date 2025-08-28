import { test, expect } from '@playwright/test';

test('Verify Work experience', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd1@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');

 await page.goto('https://dev.kredsafe.net/user/fellowships');
  await page.waitForLoadState('networkidle');
await page.locator('//*[@id="work_experience_items"]/div[1]/div/div[2]/div/div[2]/div/input').fill('Test');

// Fill fellowship job title
await page.locator('//input[@name="fellowship[0][job_title]"]').fill('QWERTY');

// Fill fellowship employer
await page.locator('//input[@name="fellowship[0][employer]"]').fill('ASD');

// Select country dropdown
const countryDropdown = page.locator('//select[contains(@class, "autoupdate country")]');
await countryDropdown.selectOption({ label: 'United States' });

// Wait for state dropdown visible
const stateDropdown = page.locator('//select[@id="state-list_0"]');
await stateDropdown.waitFor({ state: 'visible' });
await stateDropdown.selectOption({ label: 'Arizona' });

// Fill fellowship city
await page.locator('//input[@name="fellowship[0][city]"]').fill('Thanda');

// Select start month
await page.locator('//select[@id="start_month_0"]').selectOption({ label: 'Jan' });

// Select start year
await page.locator('//select[@id="we_start_year_identity_0"]').selectOption({ label: '2010' });

// Select end month
await page.locator('//select[@id="end_month_0"]').selectOption({ label: 'Jan' });

// Select end year
await page.locator('//select[@id="we_end_year_identity_0"]').selectOption({ label: '2019' });

// Scroll to and click save button using JS click + normal click
const saveAndContinueBtn = page.locator('//*[@id="id_frm_submit"]');
await saveAndContinueBtn.scrollIntoViewIfNeeded();
await page.evaluate(el => el.click(), await saveAndContinueBtn.elementHandle());
await saveAndContinueBtn.click();


  await page.waitForURL('https://dev.kredsafe.net/user/certificates', { timeout: 15000 });
await page.waitForLoadState('networkidle');


});