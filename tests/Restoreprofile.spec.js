import { test, expect } from '@playwright/test';

test('Restore flow', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  // Go to login page
  await page.goto('https://dev.kredsafe.net/login');

  // Fill login form
  await page.locator('//input[@name="email"]').fill('hrd14566@yopmail.com');
  await page.locator('//input[@name="password"]').fill('Nilesh@2025');
  await page.locator('//*[@id="id_frm_submit"]').click();

  // Wait for full page load
  await page.waitForLoadState('load');

  // Navigate to Internship page
  await page.goto('https://dev.kredsafe.net/user/internship');
await page.waitForLoadState('load');
  // Delete item (2nd delete button)
await page.evaluate(() => {
  const deleteBtn = document
    .evaluate("//a[@class='remove_me' and @rel='1']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
  deleteBtn?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  deleteBtn?.click();
});

// Wait briefly to ensure modal loads
await page.waitForTimeout(1000);

// Click the "Yes" confirmation button using XPath
await page.evaluate(() => {
  const yesBtn = document
    .evaluate("/html/body/div[12]/div/div/div[3]/button[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
  yesBtn?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  yesBtn?.click();
});

  // Open archive view
await page.evaluate(() => {
  const archiveBtn = document
    .evaluate('/html/body/div[3]/div[1]/section[2]/div/div/div[1]/div/div[2]/button/span/i', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
  archiveBtn?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  archiveBtn?.click();
});
  // Select checkbox to restore
await page.evaluate(() => {
  document
    .evaluate('//input[@id="checkAll"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue
 ?.click();});
  // Click restore
await page.evaluate(() => {
  document
    .evaluate('/html/body/div[3]/div[4]/div/div/div[2]/a/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue
     ?.click();
});
  // Close confirmation/modal

  // Reopen archive
await page.evaluate(() => {
  const archiveBtn = document
    .evaluate('/html/body/div[3]/div[1]/section[2]/div/div/div[1]/div/div[2]/button/span/i', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
  archiveBtn?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  archiveBtn?.click();
});
  // Close archive panel
await page.evaluate(() => {
  const closeBtn = document.evaluate(
    "//*[@id='recycleInfo']//label[contains(text(),'Close')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  closeBtn?.click();
});});
