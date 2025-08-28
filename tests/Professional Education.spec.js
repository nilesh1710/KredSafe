import { test, expect } from '@playwright/test';

test('Verify Work experience', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd1@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');
await page.goto('https://dev.kredsafe.net/user/professional-education');
  await page.waitForLoadState('networkidle');


 const instName = page.locator('//input[@name="education[0][institution_name]"]');
  await instName.waitFor({ state: 'visible', timeout: 10000 });
  await instName.fill('TIU');

  // Subject of study
  const subject = page.locator('//input[@name="education[0][stream]"]');
  await subject.waitFor({ state: 'visible', timeout: 10000 });
  await subject.fill('sos');

  // Country dropdown
  const countryDropdown = page.locator('//select[@class="autoupdate country"]');
  await countryDropdown.waitFor({ state: 'visible', timeout: 10000 });
  await countryDropdown.selectOption({ label: 'United States' });

  // State dropdown
const stateList = page.locator('//select[@id="state-list_0"]');
await stateList.waitFor({ state: 'visible' }); // ✅ Corrected line
await stateList.selectOption({ label: 'Arizona' });
  // City input
  const cityField = page.locator('//input[@name="education[0][city]"]');
  await cityField.waitFor({ state: 'visible', timeout: 10000 });
  await cityField.fill('Thanda');

  // Wait briefly if needed (not ideal but mimics your Selenium wait)
  await page.waitForTimeout(2000);

  // Click radio "eduYesButton" using JS
  const eduYesButton = page.locator(
    '//*[@id="work_experience_items"]/div[1]/div/div[2]/div/div[6]/div/label[1]/input[1]'
  );
  await eduYesButton.waitFor({ state: 'attached', timeout: 10000 });
  await page.evaluate(el => el.click(), await eduYesButton.elementHandle());

  // Select start month
  const startMonth = page.locator('//select[@id="start_month_0"]');
  await startMonth.waitFor({ state: 'visible', timeout: 10000 });
  await startMonth.selectOption({ label: 'Jan' });

  // Select start year
  const startYear = page.locator('//select[@id="we_start_year_identity_0"]');
  await startYear.waitFor({ state: 'visible', timeout: 10000 });
  await startYear.selectOption({ label: '2010' });

  // Scroll to "Save and Continue"/submit button
const saveBtn = page.locator('//*[@id="id_frm_submit"]');
await saveBtn.scrollIntoViewIfNeeded();
await saveBtn.waitFor({ state: 'visible' });
await page.evaluate(el => el.click(), await saveBtn.elementHandle());
  
  // Optional: Wait for next navigation or state

  await page.waitForURL('https://dev.kredsafe.net/user/internship', { timeout: 15000 });
await page.waitForLoadState('networkidle');

});