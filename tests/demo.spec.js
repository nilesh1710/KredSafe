import { test, expect } from '@playwright/test';

test('Verify login and complete all user profile sections', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  // -------- LOGIN --------
  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('input[name="email"]').fill('ts050176@yopmail.com');
  await page.locator('input[name="password"]').fill('Nilesh@2025');
  await page.locator('#id_frm_submit').click();
  await page.waitForLoadState('networkidle');

//   // -------- WORK EXPERIENCE --------
  await page.goto('https://dev.kredsafe.net/user/work-experiences');
  await page.waitForLoadState('networkidle');

  await page.locator('input[name="workexperience[0][company_name]"]').fill('Tiu');
  await page.locator('input[name="workexperience[0][job_title]"]').fill('Sr Doctor');
  await page.locator('select#country').selectOption({ label: 'United States' });

  const workStateDropdown = page.locator('select#state-list_0');
  await workStateDropdown.waitFor({ state: 'visible' });
  await workStateDropdown.selectOption('AL');

  await page.locator('input[name="workexperience[0][city]"]').fill('NY');
 await page.evaluate(() => {
    document.querySelector('#currently_working_status')?.click();
  });


  await page.locator('select#start_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_start_year_identity_0').selectOption({ label: '2010' });

  const workSubmitBtn = page.locator('#id_frm_submit > span');
  await workSubmitBtn.scrollIntoViewIfNeeded();
  await workSubmitBtn.click();

  await page.waitForURL('https://dev.kredsafe.net/user/education', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

///-------- EDUCATION --------
  await page.goto('https://dev.kredsafe.net/user/education');
  await page.waitForLoadState('networkidle');

  await page.locator('input[name="education[0][institution_name]"]').fill('Test');
  await page.locator('input[name="education[0][stream]"]').fill('Test');
  const eduCountryDropdown = page.locator('select#country');
  await eduCountryDropdown.waitFor({ state: 'visible' });
  await eduCountryDropdown.selectOption({ label: 'United States' });

  const eduStateDropdown = page.locator('select#state-list_0');
  await eduStateDropdown.waitFor({ state: 'visible' });
  await expect(eduStateDropdown).toBeEnabled({ timeout: 10000 });
  await eduStateDropdown.selectOption({ label: 'Arizona' });

  await page.locator('input#city').fill('NY');

  // Click "Yes" for education confirmation using JS
  const eduYesRadio = page.locator('//*[@id="work_experience_items"]/div[1]/div/div[2]/div/div[6]/div/label[1]/input[1]');
  await eduYesRadio.waitFor({ state: 'attached' });
  await page.evaluate(el => el.click(), await eduYesRadio.elementHandle());

  await page.locator('select#start_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_start_year_identity_0').selectOption({ label: '2010' });

  const eduSubmitBtn = page.locator('#id_frm_submit > span');
  await eduSubmitBtn.scrollIntoViewIfNeeded();
  await eduSubmitBtn.waitFor({ state: 'visible' });
  await eduSubmitBtn.click();

  await page.waitForURL('https://dev.kredsafe.net/user/professional-education', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

//   // -------- PROFESSIONAL EDUCATION --------
  await page.goto('https://dev.kredsafe.net/user/professional-education');
  await page.waitForLoadState('networkidle');

  await page.locator('input[name="education[0][institution_name]"]').fill('TIU');
  await page.locator('input[name="education[0][stream]"]').fill('sos');

  const profEduCountry = page.locator('select.autoupdate.country');
  await profEduCountry.waitFor({ state: 'visible' });
  await profEduCountry.selectOption({ label: 'United States' });

  const profEduState = page.locator('select#state-list_0');
  await profEduState.waitFor({ state: 'visible' });
  await profEduState.selectOption({ label: 'Arizona' });

  await page.locator('input[name="education[0][city]"]').fill('Thanda');

  // Click "Yes" radio button
  const profEduYesRadio = page.locator('//*[@id="work_experience_items"]/div[1]/div/div[2]/div/div[6]/div/label[1]/input[1]');
  await profEduYesRadio.waitFor({ state: 'attached' });
  await page.evaluate(el => el.click(), await profEduYesRadio.elementHandle());

  await page.locator('select#start_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_start_year_identity_0').selectOption({ label: '2010' });

  const profEduSubmitBtn = page.locator('#id_frm_submit');
  await profEduSubmitBtn.scrollIntoViewIfNeeded();
  await profEduSubmitBtn.click();

  await page.waitForURL('https://dev.kredsafe.net/user/internship', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

//  -------- INTERNSHIP --------
  await page.goto('https://dev.kredsafe.net/user/internship');
  await page.waitForLoadState('networkidle');

  await page.locator('input[name="internship[0][job_title]"]').fill('Lead');
  await page.locator('input[name="internship[0][employer]"]').fill('TIU');

  const internshipCountry = page.locator('select.autoupdate.country');
  await internshipCountry.waitFor({ state: 'visible' });
  await internshipCountry.selectOption({ label: 'United States' });

  const internshipState = page.locator('select#state-list_0');
  await internshipState.waitFor({ state: 'visible' });
  await expect(internshipState).toBeEnabled({ timeout: 15000 });
  await internshipState.selectOption({ label: 'Alabama' });

  await page.locator('input[name="internship[0][city]"]').fill('Thanda');

  await page.waitForTimeout(3000); // avoid if possible

  await page.locator('select#start_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_start_year_identity_0').selectOption({ label: '2010' });
  await page.locator('select#end_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_end_year_identity_0').selectOption({ label: '2019' });

  const internshipSubmitBtn = page.locator('#id_frm_submit');
  await internshipSubmitBtn.scrollIntoViewIfNeeded();
  await internshipSubmitBtn.click();

  await page.waitForURL('https://dev.kredsafe.net/user/residencies', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

//   // -------- RESIDENCIES --------
  await page.goto('https://dev.kredsafe.net/user/residencies');
  await page.waitForLoadState('networkidle');

  await page.locator('//*[@id="work_experience_items"]/div[1]/div/div[2]/div/div[1]/div/input').fill('AIIMS');
  await page.locator('input[name="residency[0][job_title]"]').fill('QWERTY');
  await page.locator('input[name="residency[0][employer]"]').fill('ASD');

  const residencyCountry = page.locator('select.autoupdate.country');
  await residencyCountry.selectOption({ label: 'United States' });

  const residencyState = page.locator('select#state-list_0');
  await residencyState.waitFor({ state: 'visible' });
  await residencyState.selectOption({ label: 'Arizona' });

  await page.locator('input[name="residency[0][city]"]').fill('Thanda');

  await page.locator('select#start_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_start_year_identity_0').selectOption({ label: '2010' });
  await page.locator('select#end_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_end_year_identity_0').selectOption({ label: '2019' });

  const residencySubmitBtn = page.locator('#id_frm_submit');
  await residencySubmitBtn.scrollIntoViewIfNeeded();
  await residencySubmitBtn.click();

  await page.waitForURL('https://dev.kredsafe.net/user/fellowships', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

  //-------- FELLOWSHIPS --------
  await page.goto('https://dev.kredsafe.net/user/fellowships');
  await page.waitForLoadState('networkidle');

  await page.locator('//*[@id="work_experience_items"]/div[1]/div/div[2]/div/div[2]/div/input').fill('Test');
  await page.locator('input[name="fellowship[0][job_title]"]').fill('QWERTY');
  await page.locator('input[name="fellowship[0][employer]"]').fill('ASD');

  const fellowshipCountry = page.locator('select.autoupdate.country');
  await fellowshipCountry.selectOption({ label: 'United States' });

  const fellowshipState = page.locator('select#state-list_0');
  await fellowshipState.waitFor({ state: 'visible' });
  await fellowshipState.selectOption({ label: 'Arizona' });

  await page.locator('input[name="fellowship[0][city]"]').fill('Thanda');

  await page.locator('select#start_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_start_year_identity_0').selectOption({ label: '2010' });
  await page.locator('select#end_month_0').selectOption({ label: 'Jan' });
  await page.locator('select#we_end_year_identity_0').selectOption({ label: '2019' });

  const fellowshipSubmitBtn = page.locator('#id_frm_submit');
  await fellowshipSubmitBtn.scrollIntoViewIfNeeded();
  await fellowshipSubmitBtn.click();

  await page.waitForURL('https://dev.kredsafe.net/user/certificates', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

  // -------- CERTIFICATES --------
  await page.goto('https://dev.kredsafe.net/user/certificates', { waitUntil: 'domcontentloaded', timeout: 60000 });

//  await page.goto('https://dev.kredsafe.net/user/certificates');
//  await page.waitForLoadState('networkidle');
await page.waitForSelector('input[name="certificate[0][certification_name]"]', { timeout: 20000 });

  await page.locator('input[name="certificate[0][certification_name]"]').fill('asd');

const authorityDropdown = page.locator('//select[@id="authority_<?php echo e(0); ?>"]');
await authorityDropdown.selectOption({ value: 'AL' });

  await page.locator('input[name="certificate[0][certification_date]"]').fill('02/02/2025');

  await page.waitForTimeout(2000);

  const certificateSubmitBtn = page.locator('#id_frm_submit');
  await certificateSubmitBtn.scrollIntoViewIfNeeded();
  await certificateSubmitBtn.click();

  await page.waitForURL('https://dev.kredsafe.net/user/board-certifications', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

  //-------- BOARD CERTIFICATIONS --------
  await page.goto('https://dev.kredsafe.net/user/board-certifications');
  await page.waitForLoadState('networkidle');

  await page.locator('input[name="certificate[0][certification_name]"]').fill('asd');
  await page.locator('input[name="certificate[0][authority]"]').fill('ASDF');
  await page.locator('input[name="certificate[0][certification_date]"]').fill('02/02/2025');

  await page.waitForTimeout(2000);

const boardCertSubmitBtn = page.locator('//*[@id="id_frm_submit"]');
await boardCertSubmitBtn.scrollIntoViewIfNeeded();
await boardCertSubmitBtn.waitFor({ state: 'attached' });
await page.evaluate(el => el.click(), await boardCertSubmitBtn.elementHandle());
  await page.waitForTimeout(2000);

  // Click "click here" link
const clickHereLink = page.locator('//a[text()="click here"]');
await clickHereLink.waitFor({ state: 'visible' });
await clickHereLink.scrollIntoViewIfNeeded();
await page.evaluate((el) => el.click(), await clickHereLink.elementHandle());

});
