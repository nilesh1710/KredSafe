import { test, expect } from '@playwright/test';

test('Upload multiple documents', async ({ page }) => {
  // Extend timeout for slower environments
  test.setTimeout(60000); // 60 seconds

  // Login
  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('h68@yopmail.com');
  await page.locator('//input[@name="password"]').fill('Nilesh@2025');
  await page.locator('//*[@id="id_frm_submit"]').click();
  await page.waitForLoadState('networkidle');

  // Navigate to documents page
  await page.goto('https://dev.kredsafe.net/user/documents');
  await page.waitForLoadState('networkidle');

  // Click Upload File
  await page.locator("//a[@title=' Upload File']").click();

  // Select Document Type DEA
  await page.locator("//input[@name='document_type' and @value='1']").click();

  // Select state from dropdown
  await page.locator("//*[@id='state-list']").selectOption({ label: "Wyoming" });

  // Upload the file directly using setInputFiles
  const fileInput = page.locator("//input[@class='fileUpload inputOtherBrd']");
  await fileInput.setInputFiles("C:\\Users\\Admin\\Downloads\\Anil_Kumar_Salesforce_Admin.docx");

  // Optional: Trigger change event if needed by the form
  await fileInput.evaluate(node => node.dispatchEvent(new Event('change', { bubbles: true })));

  // Confirm file is attached (debug log)
  const fileName = await fileInput.evaluate(el => el.value);
  console.log('Attached file:', fileName);

  // Submit the document
  await page.locator("//button[@id='docSubmit']").click();

  // Wait for success message (more flexible)
  await page.waitForSelector("//div[contains(., 'successfully')]", { timeout: 10000 });

  // Optional: Screenshot for verification
  await page.screenshot({ path: 'upload-confirmation.png' });

  // Assert success message is visible
  await expect(page.locator("//div[contains(., 'successfully')]")).toBeVisible();
});