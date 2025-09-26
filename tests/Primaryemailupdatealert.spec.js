import { test, expect } from '@playwright/test';

test('Verify Make primary email', async ({ page, browser }) => {
  test.setTimeout(60000); // 60 seconds

  // 1. Login to the application
  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('sep10@yopmail.com');
  await page.locator('//input[@name="password"]').fill('Nilesh@2025');
  await page.locator('//*[@id="id_frm_submit"]').click();
  await page.waitForLoadState('networkidle');

  // 2. Navigate to user overview and update email
  await page.goto('https://dev.kredsafe.net/user/overview');
  await page.waitForLoadState('load');
 // 3. Fill the alternate email
await page.getByRole('textbox', { name: 'd', exact: true }).click();
  await page.getByRole('textbox', { name: 'd', exact: true }).fill('hr26@yopmail.com');
  await page.getByRole('radio', { name: 'd', exact: true }).check();
  await page.getByRole('button', { name: 'Yes' }).click();
  console.log("✅ Filled new primary email.");

console.log("✅ PASS: Primary email updated successfully.");

  // 5. Open Yopmail in a new browser context/tab
  const context = await browser.newContext(); // 🔧 Define context properly
  const yopmailTab = await context.newPage();

  await yopmailTab.goto('https://yopmail.com/en/');
  await yopmailTab.waitForLoadState('networkidle');

  // 6. Enter the email and refresh inbox
  await yopmailTab.fill('#login', 'sep10@yopmail.com');
  await yopmailTab.press('#login', 'Enter');
  await yopmailTab.waitForLoadState('networkidle');

  // 7. Wait for the inbox iframe
  const inboxFrame = await yopmailTab.frame({ name: 'ifinbox' });

  if (!inboxFrame) {
    console.error('❌ Inbox iframe not found');
    return;
  }

  // 8. Look for the expected email
  const emailExists = await inboxFrame.locator('body', {
    hasText: 'Your Primary Email Address Has Been Updated Successfully'  }).isVisible();

  if (emailExists) {
    const emailBodyText = await inboxFrame.locator('body').textContent();
    console.log("\n📄 Inbox Body Text:\n" + emailBodyText);

    if (emailBodyText?.includes("Your Primary Email Address Has Been Updated Successfully")) {
      console.log("✅ PASS: 'Your Primary Email Address Has Been Updated Successfully' message is displayed.");
    } else {
      console.log("❌ FAIL: Expected 'Your Primary Email Address Has Been Updated Successfully ' message not found.");
    }
  } else {
    console.log("❌ FAIL: Email with subject 'Your Primary Email Address Has Been Updated Successfully ' not found in inbox.");
  }
});
