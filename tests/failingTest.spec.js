import { test, expect } from '@playwright/test';

test('intentional failure for Allure category', async () => {
  expect(1).toBe(2); // This will fail
});
