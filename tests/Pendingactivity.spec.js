import { test, expect } from '@playwright/test';

test('Verify Pending Activity', async ({ page }) => {
      test.setTimeout(60000); // 60 seconds

  await page.goto('https://dev.kredsafe.net/login');
  await page.locator('//input[@name="email"]').fill('hrd786@yopmail.com');
await page.locator('//input[@name="password"]').fill('Nilesh@2025');
await page.locator('//*[@id="id_frm_submit"]').click();
await page.waitForLoadState('networkidle');

const pendingTab = page.locator('#pendingActivityTab');
  await pendingTab.waitFor({ state: 'visible' });
  await pendingTab.click();
  await page.waitForTimeout(5000);

  const activityElements = page.locator('.pending-activity-class'); // Replace with actual locator

  const count = await activityElements.count();

  for (let i = 0; i < count; i++) {
    const element = activityElements.nth(i);
    const activityName = await element.innerText();
    console.log(`The Activity Name is ${activityName}`);

    if (
      activityName.includes('Overview') ||
      activityName.includes('Work Experience') ||
      activityName.includes('Education') ||
      activityName.includes('Internship') ||
      activityName.includes('Residency') ||
      activityName.includes('Fellowship') ||
      activityName.includes('Board Certification / Eligibility') ||
      activityName.includes('State Licenses or Certificates') ||
      activityName.includes('Pending Forms') ||
      activityName.includes('Pending Packets')
    ) {
      // Open link in a new tab (simulate Ctrl + Click)
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        element.click({ modifiers: ['Control'] })
      ]);

      await newPage.waitForLoadState();

      if (
        ['Work Experience', 'Education', 'Internship', 'Residency', 'Fellowship', 'Board Certification / Eligibility'].some(section =>
          activityName.includes(section)
        )
      ) {
        const sectionTitle = newPage.locator('.section-title-class'); // replace with actual
        await sectionTitle.waitFor();
        const sectionText = await sectionTitle.innerText();
        console.log(`The section name is ${sectionText}`);
        expect(sectionText).toBe(activityName);
      } else if (activityName.includes('State Licenses or Certificates')) {
        const sectionTitle = newPage.locator('.card-title-ses'); // replace with actual
        await sectionTitle.waitFor();
        const sectionText = await sectionTitle.innerText();
        expect(sectionText).toBe(activityName);
      } else if (
        activityName.includes('Pending Forms') ||
        activityName.includes('Pending Packets')
      ) {
        const errorMsg = newPage.locator('.error-message'); // replace with actual
        await errorMsg.waitFor();
        const errorText = await errorMsg.innerText();
        const expectedText = 'Please complete your profile before accessing the forms and packets area.';
        console.log(`Error Message: ${errorText}`);
        expect(errorText).toBe(expectedText);
      }

      await newPage.close();
    } else {
      console.log('No matching pending activities found.');
    }
  }
});

