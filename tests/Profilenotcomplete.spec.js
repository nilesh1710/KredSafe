import { test, expect } from '@playwright/test';

test('Profile not completed', async ({ page }) => {
  await page.goto('https://dev.kredsafe.net/login');

  // Fill login form
  await page.locator('//input[@name="email"]').fill('ts1234@yopmail.com');
  await page.locator('//input[@name="password"]').fill('Nilesh@2030');
  await page.locator('//*[@id="id_frm_submit"]').click();

  // Wait for page to load after login
  await page.waitForLoadState('networkidle');

  // Click the bell icon using JavaScript
  await page.evaluate(() => {
    const bellIcon = document.evaluate(
      '//*[@id="notification-bell"]/a/i',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    if (bellIcon) bellIcon.click();
  });

  // Wait for UI update
  await page.waitForTimeout(2000);

  // Click on 'Form' using JavaScript
  await page.evaluate(() => {
    const form = document.evaluate(
      '/html/body/div[3]/aside/div/div[2]/nav/ul/li[6]/a/p',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    if (form) form.click();
  });

  // Wait for error message to appear
  await page.waitForTimeout(2000);

  // Get error message using XPath
  const errorMessage = await page.evaluate(() => {
    const el = document.evaluate(
      "//div[contains(text(),'Please complete your profile')]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    return el ? el.textContent.trim() : null;
  });

  console.log("Error text:", errorMessage);

  // Assert error message
  const expected = "Please complete your profile before accessing the forms and packets area.";
//  if (errorMessage === expected) {
    //console.log("✅ Error message is correct:", errorMessage);
//  }

if (errorMessage?.trim() === expected.trim()) {
  console.log("✅ Error message is correct:", errorMessage);
} else {
  console.error("❌ Error message did not match!");
  console.error("Expected:", expected);
  console.error("Actual:  ", errorMessage);
}

});
