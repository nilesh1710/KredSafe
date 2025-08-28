import { test, expect } from '@playwright/test';

test('Verify Make primary email', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd786@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');
https://dev.kredsafe.net/user/overview
await page.goto('https://dev.kredsafe.net/user/overview');
   await page.waitForLoadState('load');
// await page.getByRole('textbox', { name: 'd', exact: true }).click();
await page.locator('input[name="email"]').fill('hr10@yopmail.com');
const radioBtn = page.locator("//input[@type='radio' and @id='lblAltEmail' and @value='email2']");
await page.evaluate(() => {
  // Find input radio by id and value attributes
  const radio = Array.from(document.querySelectorAll('input[type="radio"]'))
    .find(el => el.id === 'lblAltEmail' && el.value === 'email2');
  if (radio) radio.click();
});
await page.evaluate(() => {
  const yesButton = document.evaluate(
    "//span[@title='Yes' and normalize-space(text())='Yes']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (yesButton) yesButton.click();
});
});  