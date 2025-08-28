import { test, expect } from '@playwright/test';

test('Verify Education', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd1@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');
 await page.goto('https://dev.kredsafe.net/user/education');

  // Wait for redirect to education page and load
  await page.waitForLoadState('networkidle');

  // Fill education form
  await page.locator('input[name="education[0][institution_name]"]').fill('Test');
await page.locator('xpath=//input[@name="education[0][stream]"]').fill('Test');

  // Select country
  const countrySelect = page.locator('select#country');
  await countrySelect.waitFor({ state: 'visible' });
  await countrySelect.selectOption({ label: 'United States' });

  // Select state
  const stateDropdownEdu = page.locator('select#state-list_0');
  await stateDropdownEdu.waitFor({ state: 'visible' });
  await stateDropdownEdu.selectOption({ label: 'Arizona' });

  // Fill city
  await page.locator('input#city').fill('NY');

  // Click "Yes" for education confirmation using JS
  const eduYesButton = page.locator('xpath=//*[@id="work_experience_items"]/div[1]/div/div[2]/div/div[6]/div/label[1]/input[1]');
  await eduYesButton.waitFor({ state: 'attached' });
  await page.evaluate(el => el.click(), await eduYesButton.elementHandle());

  await page.locator('select#start_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_start_year_identity_0').selectOption({ label: '2010' });

  // Scroll and click submit for education
  const submitEduBtn = page.locator('#id_frm_submit > span');
  await submitEduBtn.scrollIntoViewIfNeeded();
  await submitEduBtn.waitFor({ state: 'visible' });
  await page.evaluate(el => el.click(), await submitEduBtn.elementHandle());

  await page.waitForURL('https://dev.kredsafe.net/user/professional-education', { timeout: 15000 });
 await page.waitForLoadState('networkidle')

});