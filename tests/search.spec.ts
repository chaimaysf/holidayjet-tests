import { test, expect } from '@playwright/test';

test('Search with any destination and filters', async ({ page }) => {
  await test.step('Search with any destination', async () => {
    await page.goto('https://holidayjet.co.uk/');
    await page.locator('input[type="date"]').fill('2026-10-01');
    await page.getByRole('combobox').selectOption('14');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText(/Showing 1-/)).toBeVisible({ timeout: 15000 });
  });

  await test.step('Apply All Inclusive filter', async () => {
    await page.locator('label').filter({ hasText: 'All Inclusive' }).nth(1).click();
  });

  await test.step('Verify filtered results displayed', async () => {
    await expect(page.getByText(/Showing 1-/)).toBeVisible({ timeout: 15000 });
  });
});