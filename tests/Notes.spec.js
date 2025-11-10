import { test, expect } from '@playwright/test';

test('Verify Notes', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds
  await page.goto('http://paypal_dev.test:8080');
  await page.locator('//input[@name="email"]').fill('sep10@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
  await page.waitForLoadState('networkidle');
 await page.goto('http://paypal_dev.test:8080/user/comments/view/Document/ODQ2');
  await page.waitForLoadState('networkidle');

  await page.waitForLoadState('networkidle');


// Locate and fill the textarea
const textarea = page.locator('textarea[name="message"]');

await expect(textarea).toBeVisible({ timeout: 30000 });
await textarea.fill('test');
await page.getByRole('button', { name: 'Submit' }).click();

// //await page.getByRole('textbox', { name: 'Message' }).scrollIntoViewIfNeeded();
// await page.evaluate(() => {
//   const textarea = document.evaluate(
//     "//textarea[@id='message_info']",
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null
//   ).singleNodeValue;

//   if (textarea) textarea.value = 'Test Notes';
// });
// await page.evaluate(() => {
//   const submitBtn = document.evaluate(
//     "//span[normalize-space(text())='Submit']",
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null
//   ).singleNodeValue;

//   if (submitBtn) submitBtn.click();
// });
  });