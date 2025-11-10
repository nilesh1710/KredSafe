import { test, expect } from '@playwright/test';

test('Verify Login lock Validation and check email in Yopmail', async ({ browser }) => {
  test.setTimeout(60000);

  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Go to login page
  //await page.goto('https://dev.kredsafe.net/login');
 await page.goto('https://stage.kredsafe.net/login');
  // 2. Enter login credentials
  await page.locator('//input[@name="email"]').fill('ts1234@yopmail.com');
  await page.locator('//input[@name="password"]').fill('Nilesh@20251');

  // 3. Attempt login 6 times
  for (let i = 0; i < 6; i++) {
    await page.locator('//*[@id="id_frm_submit"]').click();
    await page.waitForTimeout(1000); // small delay between attempts
  }

  await page.waitForLoadState('networkidle');

  // 4. Check for lockout message
  const bodyText = await page.locator('body').textContent();
  if (bodyText?.includes('Too many login attempts.')) {
    console.log("✅ 'Too many login attempts.' message displayed.");
  } else {
    console.log("❌ Text not found: Too many login attempts.");
  }

  await expect(page.locator('body')).toContainText('Too many login attempts.');

  // 5. Open Yopmail in a new tab
  const yopmailTab = await context.newPage();
  await yopmailTab.goto('https://yopmail.com/en/');
  await yopmailTab.waitForLoadState('networkidle');

  // 6. Enter email and refresh inbox
  await yopmailTab.fill('#login', 'ts1234@yopmail.com');
  await yopmailTab.press('#login', 'Enter');
    await yopmailTab.waitForLoadState('networkidle');


  // 7. Wait for iframe and switch to it
  const inboxFrame = await yopmailTab.frame({ name: 'ifinbox' });

  if (!inboxFrame) {
    console.error('❌ Inbox iframe not found');
    return;
  }

  // 8. Wait for the email list to contain the expected alert
  const emailExists = await inboxFrame.locator('body', {
    hasText: 'Failed Login Attempt Alert'
  }).isVisible();

  if (emailExists) {
    const emailBodyText = await inboxFrame.locator('body').textContent();
    console.log("\n📄 Inbox Body Text:\n" + emailBodyText);

    if (emailBodyText?.includes("Failed Login Attempt Alert")) {
      console.log("✅ PASS: 'Failed Login Attempt Alert.' message is displayed.");
    } else {
      console.log("❌ FAIL: Expected 'Failed Login Attempt Alert.' message not found.");
    }
  } 
  
});
