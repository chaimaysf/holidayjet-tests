import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,

  use: {
    headless: false,
    launchOptions: {
      slowMo: 500,
    },
    baseURL: 'https://www.holidayjet.co.uk',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});