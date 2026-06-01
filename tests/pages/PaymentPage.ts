import { Page, expect } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  async verifyPaymentPage() {
    await expect(this.page.getByText('PAYMENT OPTIONS')).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByText(/Pay low deposit today/)).toBeVisible();
  }
}