import { test, expect } from '@playwright/test';

test('complete subscription and payment flow', async ({ page }) => {
test.setTimeout(60000);
  await page.goto('https://dev.kredsafe.net/login');

  // Login
  await page.getByRole('textbox', { name: 'E-mail Address *' }).fill('hrd14566@yopmail.com');
  await page.getByRole('textbox', { name: 'Password *' }).fill('Nilesh@2025');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('load');

  // Click subscribe button

// const poneyear = page.locator("//a[@href='#tab_premium_res_50']");
// await poneyear.waitFor({ state: 'visible' });

// await page.evaluate(el => el.click(), await poneyear.elementHandle());

// Similarly for 'psixmonth'

// const psixmonth = page.locator("//input[@type='radio' and @name='prem_installments' and @data-month='6' and @value='2']");
// await psixmonth.waitFor({ state: 'visible' });

// await page.evaluate(el => el.click(), await psixmonth.elementHandle());


	
// Similarly for '12xmonth'

//   const tmonth = page.locator("//input[contains(@class, 'prem_radio_12') and contains(@class, 'prem_radio_50') and @value='1']");
// await tmonth.waitFor({ state: 'visible' });
// await page.evaluate(el => el.click(), await tmonth.elementHandle());

const pthreeyear  = page.locator("//a[@href='#tab_premium_res_48']");
 await pthreeyear .waitFor({ state: 'visible' });

 await page.evaluate(el => el.click(), await pthreeyear .elementHandle());
 
//3 Yera -full payment
// const pthreefullpay  = page.locator("//input[@name='prem_installments' and @data-month='3' and @value='1']");
// await pthreefullpay .waitFor({ state: 'visible' });

//  await page.evaluate(el => el.click(), await pthreefullpay .elementHandle());



// const pthreetwelvwmonth  = page.locator("//input[@type='radio' and @name='prem_installments' and @data-month='1' and @value='3']");
// await pthreetwelvwmonth .waitFor({ state: 'visible' });

// await page.evaluate(el => el.click(), await pthreetwelvwmonth .elementHandle());




 const pthreesixmonthr  = page.locator("//input[@type='radio' and @name='prem_installments' and @data-month='6' and @value='6']");
 await pthreesixmonthr .waitFor({ state: 'visible' });
await page.evaluate(el => el.click(), await pthreesixmonthr .elementHandle());


const subscribeBtn = page.locator("//button[@id='subscribe5']");
      await page.waitForTimeout(10000);

  await subscribeBtn.waitFor({ state: 'visible' });

  await subscribeBtn.scrollIntoViewIfNeeded();
  await subscribeBtn.click();
  await page.waitForLoadState('load');

  // Click home tab button
  // const homeTabButton = page.locator('//button[@id="home-tab_1"]');

  // await homeTabButton.waitFor({ state: 'visible' });
  // await homeTabButton.scrollIntoViewIfNeeded();
  // await homeTabButton.click();
  // console.log("Credi Button clicked");

const confirmBtn = page.locator("//button[@class='button confirm-btn']");
  await confirmBtn.waitFor({ state: 'visible' });
await confirmBtn.scrollIntoViewIfNeeded();
await confirmBtn.click();

  console.log("Button clicked");
 // await page.waitForLoadState('load');
  await page.waitForLoadState('domcontentloaded');

  // Fill card details
   await page.waitForTimeout(5000);

  await page.locator('//*[@id="cardNumber"]').waitFor({ state: 'visible' });
     await page.locator('//*[@id="cardNumber"]').fill('4111111111111111');

  await page.locator('//*[@id="cardExpiry"]').fill('09/25');
  await page.locator('//*[@id="cardCvc"]').fill('111');

  // Fill billing info
  await page.locator('//input[@id="billingName"]').fill('hcheeti');
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

await page.waitForURL('https://dev.kredsafe.net/user/subscription/dashboard', { timeout: 30000 });
  await page.waitForLoadState('load');


});