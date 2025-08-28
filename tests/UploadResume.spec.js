
import { test, expect } from '@playwright/test';
import path from 'path';

test('Upload resume and submit form', async ({ page }) => {
 test.setTimeout(60000);

  await page.goto('https://dev.kredsafe.net');
  await page.waitForTimeout(5000);

  // Scroll and click 'Register Here' using JS
  const registerHereLink = page.locator('xpath=//a[@href="https://dev.kredsafe.net/users/register/options"]');
  await registerHereLink.scrollIntoViewIfNeeded();
  await page.evaluate(el => el.click(), await registerHereLink.elementHandle());

  await page.waitForTimeout(5000);

  // Click on Upload Resume button
  const accoutRegisterUploadButton = page.locator('xpath=/html/body/div[1]/div[1]/div/div/div[2]/div/div/div[2]/a');
  await accoutRegisterUploadButton.click();
  await page.waitForTimeout(3000);

  // Refresh the page and re-select upload input
//await page.goto(page.url(), { timeout: 4000, waitUntil: 'load' });
//await page.waitForTimeout(2000);
await page.waitForLoadState('load');

  // Upload the file
  const fileInput = page.locator('xpath=//*[@id="resume_file_upload"]');
    await fileInput.waitFor({ state: 'visible', timeout: 10000 });

  const filePath = path.resolve('C:/Users/Admin/Downloads/DerekSmith(1).doc');
  await fileInput.setInputFiles(filePath);

  // Click on resume submit button
  const uploadResumeSubmitButton = page.locator('xpath=//*[@id="id_frm_submit_resume"]');
  await uploadResumeSubmitButton.click();
console.log('Clicked submit, waiting now');
//await page.waitForTimeout(1000);
console.log('Wait finished');
  // Scroll and submit the full form


await page.evaluate(() => document.querySelector('#id_frm_submit_resume_data')?.click());

  
  console.log('Form submitted successfully');

});