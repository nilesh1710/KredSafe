import { test, expect } from '@playwright/test';

test('Verify Work experience', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd1@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');

 await page.goto('https://dev.kredsafe.net/user/certificates');
  await page.waitForLoadState('networkidle');

await page.locator('//input[@name="certificate[0][certification_name]"]').fill('asd');

// Select State Authority (by value "AL")
const authorityDropdown = page.locator('//select[@id="authority_<?php echo e(0); ?>"]');
await authorityDropdown.selectOption({ value: 'AL' });

// Fill certification date
await page.locator('//input[@name="certificate[0][certification_date]"]').fill('02/02/2025');

// Optional wait (simulate `wait_in_seconds(5)`)
await page.waitForTimeout(2000);

// Scroll to Save & Continue button and click using JS + standard click
const saveAndContinueBtn = page.locator('//*[@id="id_frm_submit"]');
await saveAndContinueBtn.scrollIntoViewIfNeeded();
await page.evaluate(el => el.click(), await saveAndContinueBtn.elementHandle());
await saveAndContinueBtn.click();

  await page.waitForURL('https://dev.kredsafe.net/user/board-certifications', { timeout: 15000 });
await page.waitForLoadState('networkidle');




});