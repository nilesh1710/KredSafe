import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const filePath = 'C:\\Users\\Admin\\Desktop\\Changepasswordcsv.csv';
const csvData = fs.readFileSync(filePath);
const records = parse(csvData, { columns: true, skip_empty_lines: true });

test.describe('Data-driven Change Password from CSV', () => {
  for (const data of records) {
    test(`Change password from ${data.oldpassword} to ${data.newpassword}`, async ({ page }) => {
      test.setTimeout(60000);

      // Step 1: Login
      await page.goto('https://dev.kredsafe.net/login', { timeout: 30000 });
      await page.locator('input[name="email"]').fill('sep10@yopmail.com');
      await page.locator('input[name="password"]').fill('Nilesh@2026');
      await page.locator('#id_frm_submit').click();
      await page.waitForTimeout(5000);

      // Step 2: Navigate to change password page
      await page.goto('https://dev.kredsafe.net/user/change-password', { timeout: 30000 });
      await page.waitForTimeout(5000);

      // Step 3: Fill the form
      await page.locator('//*[@id="oldpassword"]').fill(data.oldpassword);
      await page.locator('//*[@id="passwordch"]').fill(data.newpassword);
      await page.locator('//*[@id="password_conf"]').fill(data.confirmpassword);

      // Step 4: Submit the form
      await page.locator('//*[@id="id_frm_submit"]').click();
    });
  }
});
