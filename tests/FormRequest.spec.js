import { test, expect } from '@playwright/test';

test('Fill and submit facility request form', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  const fillField = async (selector, value) => {
    const el = page.locator(selector);
    await expect(el).toBeVisible({ timeout: 10000 });
    await el.fill(value);
  };

  const facilityName = 'Roger';
  const contactPerson = 'Damc';
  const email = 'formtest@yopmail.com';
  const phone = '1233217654';
  const address = 'New York US';

  // Login
  await page.goto('https://dev.kredsafe.net/login');
  await fillField('input[name="email"]', 'hrd786@yopmail.com');
  await fillField('input[name="password"]', 'Nilesh@2025');
  await page.locator('#id_frm_submit').click();

  // Navigate to request form
  await page.goto('https://dev.kredsafe.net/user/es_forms/request-form');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000); // brief pause if needed

  // Fill facility name via JS
  await page.evaluate((value) => {
    const input = document.querySelector('#facility_name');
    if (input) input.value = value;
  }, facilityName);

  // Fill contact person with dispatching events
  await page.evaluate((value) => {
    const input = document.querySelector('#contact_person');
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, contactPerson);

  // Fill email normally
  await page.waitForSelector('#email', { timeout: 10000 });
  await page.locator('#email').fill(email);

  // Fill phone 
  await page.evaluate((value) => {
    const input = document.querySelector('#phone');
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, phone);

  // Fill address textarea 
  await page.evaluate((value) => {
    const textarea = document.querySelector('textarea[name="address"]');
    if (textarea) {
      textarea.value = value;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, address);

await page.evaluate(() => {
  const uploadInput = document.querySelector("input[type='file'][id='template_ducument'][name='file[]'].form-control");
  if (uploadInput) {
    uploadInput.click();
  }
});
  // Scroll down  to element
  await page.keyboard.press('PageDown');
});
