import { test, expect } from '@playwright/test';

test('Verify Work experience', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd1@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForTimeout(5000);
await page.goto('https://dev.kredsafe.net/user/overview'),
  await page.waitForLoadState('networkidle');

await page.waitForTimeout(1000);

  // Fill DOB
  await page.locator('//input[@name="dob"]').fill('11/11/1990');

  // Fill SSN
  await page.locator('//*[@id="ssn-field"]').fill('127006739'); // Replace with your SSN variable
  //await page.keyboard.press('Tab');
  await page.waitForTimeout(1000); // wait 15 seconds

  // Fill ZIP code
  await page.locator('//*[@id="zip"]').fill('07086');

  // Select Country (if required — assuming default selected)

  // Wait for State dropdown and select
  await page.waitForSelector('//select[@id="state-list"]');
  await page.locator('//select[@id="state-list"]').selectOption({ value: 'AL' });

  // Fill City
  await page.locator('//input[@id="city"]').fill('NY');

  // Select Industry
  await page.locator('//select[@id="industry_id"]').selectOption({ value: '255' });

  // Select Category
  await page.locator('//select[@id="category"]').selectOption({ value: 'Allied Health' });

  // Wait, Scroll, and Select Speciality
  await page.waitForTimeout(2000);
  await page.locator('//span[@class="select2-search select2-search--inline"]').scrollIntoViewIfNeeded();
  await page.locator('//span[@class="select2-search select2-search--inline"]').click();

  // Select from dropdown (highlighted)
  await page.locator('//li[contains(@class,"select2-results__option--highlighted")]').click();

  // Scroll to and Click Submit Button
  const submitBtnSpan = page.locator('//*[@id="id_frm_submit"]/span');
await submitBtnSpan.scrollIntoViewIfNeeded();
await submitBtnSpan.waitFor({ state: 'visible' });
await page.evaluate(el => el.click(), await submitBtnSpan.elementHandle());

  await page.waitForTimeout(2000);
  await page.waitForURL('https://dev.kredsafe.net/user/work-experiences', { timeout: 15000 });
await page.waitForLoadState('networkidle');


});