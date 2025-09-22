import { test, expect } from '@playwright/test';

test('Verify Notes', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/');
  await page.getByRole('textbox', { name: 'E-mail Address *' }).click();
  await page.getByRole('textbox', { name: 'E-mail Address *' }).fill('swapj@yopmail.com');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Nilesh@2025');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('load');
 await page.goto('https://dev.kredsafe.net/user/comments/view/Document/NDkz');
   await page.waitForLoadState('load');

//await page.getByRole('textbox', { name: 'Message' }).scrollIntoViewIfNeeded();
await page.evaluate(() => {
  const textarea = document.evaluate(
    "//textarea[@id='message_info']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (textarea) textarea.value = 'Test Notes';
});
await page.evaluate(() => {
  const submitBtn = document.evaluate(
    "//span[normalize-space(text())='Submit']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (submitBtn) submitBtn.click();
});
  });