import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// CSV file path (Windows - make sure to double the backslashes)
const csvFilePath = 'C:\\Users\\Admin\\Desktop\\loginData.csv';

// Read and parse CSV
const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
const testData = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
});

test.describe('Login tests - Data Driven from CSV', () => {
  testData.forEach(({ email, password }, index) => {
    test(`Login [${index + 1}] with ${email}`, async ({ page }) => {
      test.setTimeout(60000);

      await page.goto('https://dev.kredsafe.net/login');

      await page.locator('input[name="email"]').fill(email);
      await page.locator('input[name="password"]').fill(password);
      await page.locator('#id_frm_submit').click();

      await page.waitForLoadState('networkidle');

      const currentURL = page.url();

      if (/dashboard|home|profile/.test(currentURL)) {
        console.log(`✅ Login success for ${email}`);
        expect(currentURL).toMatch(/dashboard|home|profile/);
      } else {
        const errorMessage = await page
          .locator('.alert-danger, .error-message')
          .textContent()
          .catch(() => '');
        console.log(`❌ Login failed for ${email}: ${errorMessage?.trim() || 'No visible error message'}`);
        expect(currentURL).toBe('https://dev.kredsafe.net/login');
      }
    });
  });
});
