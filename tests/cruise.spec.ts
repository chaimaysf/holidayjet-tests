import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { PassengerFormPage } from './pages/PassengerFormPage';
import { PaymentPage } from './pages/PaymentPage';

test('Cruise deal booking tunnel', async ({ page }) => {
  test.setTimeout(120000);
  const homePage = new HomePage(page);
  const passengerForm = new PassengerFormPage(page);
  const paymentPage = new PaymentPage(page);

  await test.step('Navigate to cruise deal', async () => {
    await homePage.navigate();
    await homePage.closeChatbot();
    await page.getByRole('heading', { name: 'Nile Cruise + Hurghada' }).click();
    await page.getByRole('button', { name: 'View deal »' }).first().click();
  });

  await test.step('Select date and book', async () => {
    await page.locator('.hidden > .bg-white.rounded-2xl > .p-4 > .border-t.pt-4 > .flex.items-center.justify-between > button:nth-child(3)').click();
    await page.getByRole('button', { name: '1 £766', exact: true }).click();
    await page.getByRole('button', { name: '15 £' }).click();
    await page.getByText('MoTuWeThFrSaSu1£7662£7663£').nth(1).click();
    await page.getByRole('button', { name: '1 £766', exact: true }).click();
    await page.getByRole('button', { name: 'Book Now' }).click();
  });

  await test.step('Select flight and extras', async () => {
    await page.getByRole('button', { name: 'Select' }).nth(2).click();
    await page.getByRole('button', { name: 'Upgrade' }).click();
    await page.getByRole('button', { name: 'Add Tour' }).nth(1).click();
    await page.getByRole('button', { name: 'Shuttle bus (return) £19 per' }).click();
  });

  await test.step('Fill passenger contact information', async () => {
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await passengerForm.fillContactInfo('test1@gmail.com', '0923245678');
    await passengerForm.fillLeadPassenger('Mr', 'sarah', 'sarag', '2', '1', '2000', '29000', '12 rue de la chapelle', 'london', 'United Kingdom');
    await passengerForm.fillSecondPassenger('Mr', 'raphael', 'fraser', '1', '4', '2000');
    await passengerForm.continuToPayment();
  });

  await test.step('Verify payment page', async () => {
    await paymentPage.verifyPaymentPage();
  });
});