import { test, expect } from '@playwright/test';

test('Verify forgot password and reset flow', async ({ page, context }) => {
      test.setTimeout(60000); // 60 seconds

  // 1. Go to login page
  await page.goto('https://dev.kredsafe.net/login');

  // 2. Scroll down
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));

  // 3. Click "Forgot Password"
  await page.locator('xpath=//*[@id="loginForm"]/div[4]/div[2]/a').click();
  await page.waitForTimeout(2000);

  // 4. Fill and submit email
  const emailInput = page.locator('xpath=//*[@id="email"]');
  const submitButton = page.locator('xpath=//*[@id="id_frm_submit"]');
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill('swapj@yopmail.com');
  await submitButton.click();
  await page.waitForTimeout(3000);

  // 5. Open Yopmail in new tab
  const yopmailTab = await context.newPage();
  await yopmailTab.goto('https://yopmail.com/en/', { waitUntil: 'domcontentloaded' });
  await yopmailTab.fill('#login', 'swapj@yopmail.com');
  await yopmailTab.click('#refreshbut');
  await yopmailTab.waitForTimeout(2000);

  // 6. Click on email from inbox iframe
  const inboxFrame = yopmailTab.frameLocator('#ifinbox');

  // 7. Click "Click here" link in mail iframe
  const mailFrame = yopmailTab.frameLocator('#ifmail');
  const resetLink = mailFrame.locator('xpath=//*[@id="mail"]/div/div/table/tbody/tr/td/p[2]/a');

  // 8. Wait for reset password tab to open
  const [resetTab] = await Promise.all([
    context.waitForEvent('page'),
    resetLink.click(),
  ]);

  await resetTab.waitForLoadState('domcontentloaded');

  // 9. Fill new password
  await resetTab.locator('xpath=//*[@id="passwordL"]').fill('Nilesh@2025');
  await resetTab.locator('xpath=//*[@id="password_conf"]').fill('Nilesh@2025');
  await resetTab.locator('xpath=//*[@id="id_frm_submit_reset_pwd"]/span').click();

  // 10. Optional wait or assertion
  await resetTab.waitForTimeout(3000);
});
