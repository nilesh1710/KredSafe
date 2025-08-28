import { test, expect } from '@playwright/test';

test('Verify OTP via YOPMail', async ({ page, context }) => {
    test.setTimeout(60000); // 60 seconds

  // 1. Go to login page
  await page.goto('https://dev.kredsafe.net/login');

  // 2. Login with credentials
  await page.locator('input[name="email"]').fill('ts1234@yopmail.com');
  await page.locator('input[name="password"]').fill('Nilesh@2030');
  await page.locator('#id_frm_submit').click();

  // 3. Open new tab for YOPMail
  const yopmailTab = await context.newPage();
  await yopmailTab.goto('https://yopmail.com/en/');
await yopmailTab.waitForLoadState('networkidle');

  // 4. Enter email and open inbox
  await yopmailTab.fill('#login', 'ts1234@yopmail.com');
  await yopmailTab.click('#refreshbut');
  await yopmailTab.waitForTimeout(3000); // wait for iframe to load

  // 5. Get iframe named 'ifmail'
  const emailFrame = yopmailTab.frame({ name: 'ifmail' });
  if (!emailFrame) throw new Error('❌ Iframe "ifmail" not found');

  // 6. Get the OTP text content
  const otpElement = await emailFrame.locator('xpath=//*[@id="mail"]/div/div/table/tbody/tr/td/p[2]');
  await otpElement.waitFor({ state: 'visible', timeout: 10000 });

  const otpText = await otpElement.textContent();
  console.log('📨 Full email content:', otpText?.trim());

  // 7. Extract OTP using regex
  const otpCodeMatch = otpText?.match(/\b\d{6}\b/);
  if (!otpCodeMatch) throw new Error('❌ OTP code not found in email');

  const otpCode = otpCodeMatch[0];
  console.log('✅ Extracted OTP:', otpCode);

await page.bringToFront();
await page.goto('https://dev.kredsafe.net/accept-otp');
await page.waitForTimeout(2000);
await page.evaluate((otp) => {
  const input = document.querySelector('#idOTP');
  input.value = otp;

  // Dispatch input event in case the site listens to it
  input.dispatchEvent(new Event('input', { bubbles: true }));
}, otpCode);
await page.evaluate(() => {
  const btn = document.querySelector('#btnSubmit');
  if (btn) btn.click();
  else console.warn('Button not found');
});  });