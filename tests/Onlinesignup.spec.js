import { test, expect } from '@playwright/test';

test('Your test name', async ({ page, context }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net');

  // 1. Click on "Register Here" using JS click
  const registerHereLink = page.locator('xpath=//a[@href="https://dev.kredsafe.net/users/register/options"]');
  await page.evaluate((el) => el.click(), await registerHereLink.elementHandle());

  // 2. Wait and click "Register Using Online Application"
  const registerOnlineLink = page.locator('xpath=//a[@href="https://dev.kredsafe.net/guest/verify"]');
  await page.waitForTimeout(5000);
  await registerOnlineLink.click();

  // 3. Fill email field
  const emailField = page.locator('xpath=//input[@class="emailInputText"]');
  await emailField.waitFor({ state: 'visible', timeout: 10000 });
  await emailField.fill('ts097110@yopmail.com');

  // 4. Wait and click submit
  await page.waitForTimeout(3000);
  const submitButton = page.locator('xpath=//*[@id="id_frm_submit_reg"]');
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click();

  // Wait for confirmation or redirection
  await page.waitForTimeout(1000); // ⛔️ FIXED: was `await page.waitForTimeout2000);`

  // 5. Go to Yopmail
  await page.goto('https://yopmail.com', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  await page.fill('#login', 'ts097110@yopmail.com');
  await page.click('#refreshbut');

  // 6. Find the iframe containing the email
  const mailFrame = page.frameLocator('#ifmail');
  const registerYopmailButton = mailFrame.locator(
    'xpath=//a[contains(@href, "https://dev.kredsafe.net/register") and @title="Register Now"]'
  );

  await registerYopmailButton.waitFor({ state: 'visible', timeout: 15000 });

  // 7. Click the email link which opens a new tab
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  registerYopmailButton.evaluate((el) => el.click()),
]);
await newPage.waitForLoadState('domcontentloaded');
console.log('New tab URL before load wait:', await newPage.url());

//await newPage.waitForLoadState('domcontentloaded', { timeout: 15000 });
console.log('domcontentloaded event passed');

  // 8. Fill the form fields via JS evaluate
  await newPage.evaluate(() => {
    const setValue = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) {
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    setValue('#first_name', 'Niraj');
    setValue('#last_name', 'User');
    setValue('#passwordL', 'Nilesh@2025');
    setValue('#password_conf', 'Nilesh@2025');
    setValue('#mobilenumber', '2400399345');
    setValue('#zip', '111111');
  });

  // 9. Click "Submit" via JS
await newPage.evaluate(() => {
  document.querySelector('#id_frm_submit')?.click();
});

  // Optional: wait for result/confirmation
  //await newPage.waitForTimeout(3000);
});

//await page.locator('xpath=//*[@id="first_name"]').fill('Niraj');
//await page.locator('xpath=//*[@id="last_name"]').fill('User');
//await page.locator('xpath=//*[@id="passwordL"]').fill('Nilesh@2025');
//await page.locator('xpath=//*[@id="password_conf"]').fill('Nilesh@2025');
//await page.locator('xpath=//*[@id="mobilenumber"]').fill('2344322345');
//await page.locator('xpath=//*[@id="zip"]').fill('111111');

// Click the account register button
//await page.locator('xpath=//*[@id="id_frm_submit"]').click();

