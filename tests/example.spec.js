import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('basic test', async ({ page }) => {
  allure.label('layer', 'web');
  allure.owner('tester');

  await page.goto('https://example.com');

  await allure.step('Page title checked', async () => {
    const title = await page.title();
    console.log(title);
  });
});