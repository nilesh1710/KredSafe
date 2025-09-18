import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    const FirstName = 'John';
  const LastName = 'Doe';
  const Mobile = '9876543210';
  const Email = 'ohn@yopmail.com';
  const createAccountPassword = 'Test@123';
  const createAccountcPassword = 'Test@123';
  await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/login/');
 // await page.getByText('Sign Up').click();
   await page.goto('https://surecafe.tiuconsulting.us/frontend/auth/signup');

  // Wait for the first name input to be visible
  //await page.locator('#firstname').waitFor(); // Adjust selector as needed
 console.log('Navigated to:', page.url());

  // Fill form using accessible placeholders or labels (update as needed)
await page.locator('#first_name').fill(FirstName);
  await page.locator('#last_name').fill(LastName);
  await page.locator('#mobile').fill(Mobile);
  await page.locator('#email').fill(Email);
  await page.locator('#password').fill(createAccountPassword);
  await page.locator('#c_password').fill(createAccountcPassword);

  // Checkbox
const termsCheckbox = page.locator('[formcontrolname="acceptTermsPolicy"]');
await termsCheckbox.waitFor({ state: 'visible' });
await termsCheckbox.check();
  // Submit
const signupButton = page.getByRole('button', { name: 'Sign Up' });
await signupButton.scrollIntoViewIfNeeded();
await signupButton.click();

  await page.waitForTimeout(5000); // Replace with actual wait if possible
});