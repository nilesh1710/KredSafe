import { test, expect } from '@playwright/test';
test('Verify Expenses display', async ({ page }) => {
  // Set test timeout
  test.setTimeout(60000);
 
  // Go to the login page and wait for it to load
  await page.goto('https://dev.kredsafe.net/');
  await page.waitForLoadState('load');
 
  // Perform login with improved selectors
  await page.fill('input[name="email"]', 'sep10@yopmail.com');
  await page.fill('input[name="password"]', 'Nilesh@2025');
  await page.click('#id_frm_submit');
 
  // Wait for navigation after login
  await page.waitForLoadState('networkidle');
 

const expensesTab = page.locator('#expensesTab');
await page.locator('text=Expenses').click();

 
  // Wait for the expenses container box to appear
  const expensesContainer = page.locator('#expensesContUl');
  await expensesContainer.waitFor({ state: 'visible', timeout: 30000 });
 
  // Define selectors based on screenshot structure
  // These selectors grab the dollar amounts from the right column
const subscriptionValue = await page.locator('xpath=//*[@id="expensesContUl"]/div/div[1]/span[2]').textContent();
const packetsValue = await page.locator('xpath=//*[@id="expensesContUl"]/div/div[2]/span[2]').textContent();
const formsValue = await page.locator('xpath=//*[@id="expensesContUl"]/div/div[3]/span[2]').textContent();
const totalValue = await page.locator('xpath=//*[@id="expensesContUl"]/div/div[4]/span[2]').textContent();

console.log('Subscription:', subscriptionValue?.trim());
console.log('Packets:', packetsValue?.trim());
console.log('Forms:', formsValue?.trim());
console.log('Total:', totalValue?.trim());
 
});
 