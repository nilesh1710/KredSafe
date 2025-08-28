import { test, expect } from '@playwright/test';

test('Verify Work Board', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd29@mailinator.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');

 


  await page.goto('https://dev.kredsafe.net/user/board-certifications');

  await page.locator('//input[@name="certificate[0][certification_name]"]').fill('asd');

// Fill certificate authority
await page.locator('//input[@name="certificate[0][authority]"]').fill('ASDF');

// Fill certification date
await page.locator('//input[@name="certificate[0][certification_date]"]').fill('02/02/2025');

// Wait for 5 seconds (simulate wait_in_seconds(5))
await page.waitForTimeout(3000);

// Scroll and click Save & Continue button using JS and then click
const saveAndContinueBtn = page.locator('//*[@id="id_frm_submit"]');
await saveAndContinueBtn.scrollIntoViewIfNeeded();
await saveAndContinueBtn.waitFor({ state: 'attached' });
await page.evaluate(el => el.click(), await saveAndContinueBtn.elementHandle());

// Wait again (simulate wait_in_seconds(5))
await page.waitForTimeout(5000);

// Click "clickhere" button (add its locator based on your actual HTML)
 await page.waitForURL('https://dev.kredsafe.net/user/statement', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

const clickHereLink = page.locator('//a[text()="click here"]');
await clickHereLink.waitFor({ state: 'visible' });
await clickHereLink.scrollIntoViewIfNeeded();
await page.evaluate((el) => el.click(), await clickHereLink.elementHandle());

});