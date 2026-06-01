import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://holidayjet.co.uk/');
  }

  async closeChatbot() {
    await this.page.locator('.absolute.right-4.top-4').click();
  }

  async search(destination: string, date: string, duration: string) {
    await this.page.getByText('Any destination').click();
    await this.page.getByRole('button', { name: destination }).nth(1).click();
    await this.page.locator('input[type="date"]').fill(date);
    await this.page.getByRole('combobox').selectOption(duration);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async searchAnyDestination(date: string, duration: string) {
    await this.page.locator('input[type="date"]').fill(date);
    await this.page.getByRole('combobox').selectOption(duration);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }
}