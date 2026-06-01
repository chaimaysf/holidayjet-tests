/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: process.env.CI ? true : false,
    launchOptions: {
      slowMo: 500,
    },
    baseURL: process.env.BASE_URL || 'https://www.holidayjet.co.uk',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});