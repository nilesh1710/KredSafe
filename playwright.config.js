import { defineConfig, devices } from '@playwright/test';

const LT_USERNAME = 'nshekdar';
const LT_ACCESS_KEY = 'LT_6VFot7JxPlDmRO9p8mFz8W2HfdUTKedygGUXxh0bKM4gH0m';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'chrome-lambdatest',
      use: {
        browserName: 'chromium',
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'Chrome',
              browserVersion: 'latest',
              'LT:Options': {
                platform: 'Windows 11',
                build: 'Playwright LambdaTest Build',
                name: 'Chrome Test on LambdaTest',
                user: LT_USERNAME,
                accessKey: LT_ACCESS_KEY,
                console: true,
                network: true,
              },
            })
          )}`,
        },
      },
    },
  ],
});
