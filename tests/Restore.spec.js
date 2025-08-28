import { test } from '@playwright/test';

test('Restore flow with visible JS clicks and robust handling', async ({ page }) => {
  // 1. Zoom in for clarity (optional)
      test.setTimeout(60000); // 60 seconds

   await page.goto('https://dev.kredsafe.net/login');
  await page.locator('input[name="email"]').fill('ts050176@yopmail.com');
  await page.locator('input[name="password"]').fill('Nilesh@2025');
  await page.locator('#id_frm_submit').click();
  await page.waitForLoadState('networkidle');

  /// 1. Navigate to the Internship page
await page.goto('https://dev.kredsafe.net/user/internship');
await page.waitForLoadState('networkidle');

// 2. Click the "View Archive of Internship" button
const archiveBtn = page.locator("//button[@title='View Archive of Internship']");
await archiveBtn.waitFor({ state: 'attached', timeout: 10000 }); // Safe wait
await page.evaluate(el => el.click(), await archiveBtn.elementHandle());
await page.waitForLoadState('networkidle');

// 3. Select the "Check All" checkbox
const checkAllBox = page.locator('//input[@id="checkAll"]');
await checkAllBox.waitFor({ state: 'visible', timeout: 10000 });
await checkAllBox.click();

// 4. Click the "Restore" button
const restoreBtn = page.locator("//a[@title='Restore' and contains(@class, 'btn_restore_arch_itms')]");
await restoreBtn.waitFor({ state: 'visible', timeout: 10000 });
await restoreBtn.click();


  // // 4. Helper: JS click by XPath with pause
  // async function clickByXPath(xpath, pauseMs = 1500) {
  //   await page.evaluate((xp) => {
  //     const el = document.evaluate(xp, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  //     el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     el?.click();
  //   }, xpath);
  //   console.log(`Clicked element via XPath: ${xpath}`);
  //   await page.waitForTimeout(pauseMs);
  // }

  // // 5. Perform clicks in the correct sequence
  // await clickByXPath("//a[@class='remove_me' and @rel='1']");
  // await clickByXPath("/html/body/div[12]/div/div/div[3]/button[2]/span");
  // await clickByXPath('/html/body/div[3]/div[1]/section[2]/div/div/div[1]/div/div[2]/button/span/i');
  // await clickByXPath('//input[@id="checkAll"]');
  // await clickByXPath('/html/body/div[3]/div[4]/div/div/div[2]/a/span');
  // await clickByXPath('/html/body/div[3]/div[1]/section[2]/div/div/div[1]/div/div[2]/button/span/i');
  // await clickByXPath("//*[@id='recycleInfo']//label[contains(text(),'Close')]");

  // // 6. Final pause to observe the result
  // await page.waitForTimeout(2000);
});
