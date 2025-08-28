import { test, expect } from '@playwright/test';

test('Verify OTP via YOPMail', async ({ page, context }) => {
  test.setTimeout(60000); // 60 seconds

  // 1. Go to login page
  await page.goto('https://dev.kredsafe.net/login');

  // 2. Login with credentials
  await page.locator('input[name="email"]').fill('hrd1@yopmail.com');
  await page.locator('input[name="password"]').fill('Nilesh@2025');
  await page.locator('#id_frm_submit').click();

  // 3. Wait for navigation
  await page.waitForLoadState('networkidle');

  // 4. Get current URL
  const currentUrl = page.url();
  console.log("Current URL is: " + currentUrl);

  // 5. Check if OTP is required
  if (currentUrl.includes("https://dev.kredsafe.net/accept-otp")) {
    console.log("OTP required, proceeding to fetch OTP");

    const yopmailTab = await context.newPage();
    await yopmailTab.goto('https://yopmail.com/en/');

    // 6. Enter email and open inbox
    await yopmailTab.fill('#login', 'hrd1@yopmail.com');
    await yopmailTab.click('#refreshbut');
    await yopmailTab.waitForTimeout(3000); // wait for iframe to load

    // 7. Get iframe named 'ifmail'
    const emailFrame = yopmailTab.frame({ name: 'ifmail' });
    if (!emailFrame) throw new Error('❌ Iframe "ifmail" not found');

    // 8. Get the OTP text content
    const otpElement = emailFrame.locator('xpath=//*[@id="mail"]/div/div/table/tbody/tr/td/p[2]');
    await otpElement.waitFor({ state: 'visible', timeout: 10000 });

    const otpText = await otpElement.textContent();
    console.log('📨 Full email content:', otpText?.trim());

    // 9. Extract OTP using regex
    const otpCodeMatch = otpText?.match(/\b\d{6}\b/);
    if (!otpCodeMatch) throw new Error('❌ OTP code not found in email');

    const otpCode = otpCodeMatch[0];
    console.log('✅ Extracted OTP:', otpCode);

    // 10. Switch back to OTP screen
    await page.bringToFront();
    await page.goto('https://dev.kredsafe.net/accept-otp');
    await page.waitForTimeout(2000);

    // 11. Fill and submit OTP
    await page.evaluate((otp) => {
      const input = document.querySelector('#idOTP');
      if (input) {
        input.value = otp;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, otpCode);

    await page.evaluate(() => {
      const btn = document.querySelector('#btnSubmit');
      if (btn) btn.click();
      else console.warn('Button not found');
    });

    console.log('✅ OTP submitted successfully');

  } else {
    console.log('✅ Logged in without OTP - Test ends here.');
  }
});
