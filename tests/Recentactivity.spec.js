import { test, expect } from '@playwright/test';

test('Verify Recent Activity', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');

  // Login
  await page.locator('input[name="email"]').fill('ts1234@yopmail.com');
  await page.locator('input[name="password"]').fill('Nilesh@2030');
  await page.locator('#id_frm_submit').click();

  // Wait for navigation to complete
  await page.waitForURL('**/user/home');
  await page.waitForTimeout(5000); // Let the activities table render

  // Define locators
  const activityRows = page.locator('#activities > tbody > tr');
  const scrollContainer = page.locator('.dataTables_scrollBody'); // Confirm this selector in dev tools

  let previousCount = 0;
  let currentCount = await activityRows.count();

  // Keep scrolling until all rows are loaded
  while (currentCount > previousCount) {
    previousCount = currentCount;

    // Scroll to bottom
    await scrollContainer.evaluate(el => el.scrollTop = el.scrollHeight);

    // Wait for new data to load
    await page.waitForTimeout(1000);

    // Recalculate count
    currentCount = await activityRows.count();
  }

  console.log('✅ Total Recent Activities Loaded:', currentCount);

  // Optional: assert at least 1,000+ entries (if required)
  expect(currentCount).toBeGreaterThan(1000);
});

