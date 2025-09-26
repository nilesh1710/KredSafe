import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// CSV file path (make sure to double backslashes on Windows)
const csvFilePath = 'C:\\Users\\Admin\\Desktop\\loginData.csv';

// Read and parse CSV file
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

      // Fill in login form
      await page.locator('input[name="email"]').fill(email);
      await page.locator('input[name="password"]').fill(password);
      await page.locator('#id_frm_submit').click();

      // Wait for network to be idle to allow navigation or error message display
      await page.waitForLoadState('networkidle');

      const currentURL = page.url();

      if (/dashboard|home|profile/.test(currentURL)) {
        // Login successful
        console.log(`✅ Login success for ${email}`);
        expect(currentURL).toMatch(/dashboard|home|profile/);
      } else {
        // Login failed - look for the exact error message element
        const errorLocator = page.locator('.alert-danger, .error-message')
          .filter({ hasText: 'E-mail address or password is incorrect.' })
          .first();

        // Expect the error message to be visible within 5 seconds
        await expect(errorLocator).toBeVisible({ timeout: 5000 });

        // Get error message text content
        const errorMessage = await errorLocator.textContent();

        console.log(`❌ Login failed for ${email}: ${errorMessage?.trim()}`);

        // Assert the error message text is exactly as expected
        expect(errorMessage?.trim()).toBe('E-mail address or password is incorrect.');

        // Assert that user stays on login page URL
        expect(currentURL).toBe('https://dev.kredsafe.net/login');
      }
    });
  });
});
