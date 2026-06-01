import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { PassengerFormPage } from './pages/PassengerFormPage';
import { PaymentPage } from './pages/PaymentPage';

test('Complete booking tunnel', async ({ page }) => {
  const homePage = new HomePage(page);
  const passengerForm = new PassengerFormPage(page);
  const paymentPage = new PaymentPage(page);

  await test.step('Search for a holiday package', async () => {
    await homePage.navigate();
    await homePage.search('Tenerife, Canary Islands', '2026-08-01', '9');
  });

  await test.step('Select a hotel', async () => {
    await page.getByText('Hotel Tigaiga').click();
    await page.getByRole('button', { name: /Book Now/ }).first().click();
    await page.getByRole('button', { name: 'Selected' }).click();
    await page.getByRole('button', { name: 'Book Now →' }).click();
  });

  await test.step('Fill passenger information', async () => {
    await page.getByRole('button').nth(5).click();
    await passengerForm.fillContactInfo('Test@gmail.com', '0751624323');
    await passengerForm.fillLeadPassenger('Mr', 'Amine', 'Ben houssine', '1', '3', '1998', '95100', '40 rue pasteur', 'cergy', 'France');
    await passengerForm.fillSecondPassenger('Mrs', 'selma', 'ben houssine', '3', '1', '2000');
    await passengerForm.continuToPayment();
  });

  await test.step('Verify payment page', async () => {
    await paymentPage.verifyPaymentPage();
  });
});