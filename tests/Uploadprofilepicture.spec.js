import { test, expect } from '@playwright/test';

test('Verify Upload profile picture', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('ts1234@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2030');
await page.locator('//*[@id="id_frm_submit"]').click();
  await page.waitForTimeout(5000);
await page.goto('https://dev.kredsafe.net/user/overview');

  await page.waitForTimeout(3000);

const upload = page.locator('#profile_img');

// Move to the element and click it using JS click
await upload.evaluate(el => el.click());

await upload.setInputFiles('C:\\Users\\Admin\\Desktop\\Tesst Data\\surecafetest.jpg');

  console.log('✅ Profile image uploaded successfully.');
});
