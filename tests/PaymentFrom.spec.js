import { test, expect } from '@playwright/test';

test('Form From Payment flow', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');

  // Login
  await page.getByRole('textbox', { name: 'E-mail Address *' }).fill('hrd14566@yopmail.com');
  await page.getByRole('textbox', { name: 'Password *' }).fill('Nilesh@2025');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('load');
    // await page.goto('https://dev.kredsafe.net/user/home');
    // await page.waitForLoadState('load');


const home = page.locator("//span[@class='nav-link menuBars' and @data-widget='pushmenu']");

 await home .waitFor({ state: 'visible' });
 await page.evaluate(el => el.click(), await home  .elementHandle());


 const pkt = page.locator(" //p[text()='Forms']");

 await pkt .waitFor({ state: 'visible' });
 await page.evaluate(el => el.click(), await pkt  .elementHandle());


// const cart = page.locator('//*[@id="cartIcon"]/a/i');
//  await cart .waitFor({ state: 'visible' });
//  await page.evaluate(el => el.click(), await cart  .elementHandle());


const chk = page.locator('//*[@id="form_chek_2198"]');
 await chk .waitFor({ state: 'visible' });
 await page.evaluate(el => el.click(), await chk  .elementHandle());

   // await page.waitForTimeout(2000);


const addToCartBtn = page.locator(`//*[@id="frm-example"]/p/button`);
 await addToCartBtn .waitFor({ state: 'visible' });
 await addToCartBtn.scrollIntoViewIfNeeded();
   // await page.waitForTimeout(1000);

await addToCartBtn.click();

  await page.waitForLoadState('load');
   await page.waitForTimeout(1000);

const confirmBtn = page.locator("//button[@class='button confirm-btn']");
  await confirmBtn.waitFor({ state: 'visible' });
await confirmBtn.scrollIntoViewIfNeeded();
await confirmBtn.click();

  console.log("Button clicked");
  await page.waitForLoadState('domcontentloaded');

  // Fill card details
   await page.waitForTimeout(3000);

  await page.locator('//*[@id="cardNumber"]').waitFor({ state: 'visible' });
     await page.locator('//*[@id="cardNumber"]').fill('4111111111111111');

  await page.locator('//*[@id="cardExpiry"]').fill('09/25');
  await page.locator('//*[@id="cardCvc"]').fill('111');

  // Fill billing info
  await page.locator('//input[@id="billingName"]').fill('hch');
  await page.locator('//input[@id="billingAddressLine1"]').fill('Nagpur');
  await page.locator('//input[@id="billingLocality"]').fill('Nagpur');
  await page.locator('//input[@id="billingPostalCode"]').fill('441108');

  // Select state (3rd option)
  const stateDropdown = page.locator('//select[@id="billingAdministrativeArea"]');
  await stateDropdown.selectOption({ index: 2 }); // 0-based index

  // Scroll to Pay button and click via JS click
  const payButton = page.locator('//div[@class="SubmitButton-IconContainer"]');

  await payButton.waitFor({ state: 'visible' });
  await payButton.scrollIntoViewIfNeeded();
  
await payButton.click();
   await page.waitForTimeout(5000);
   await page.waitForTimeout(1000);

await page.waitForURL('https://dev.kredsafe.net/user/es_forms', { timeout: 50000 });
  await page.waitForLoadState('load');


});
