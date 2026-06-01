import { Page } from '@playwright/test';

export class PassengerFormPage {
  constructor(private page: Page) {}

  async fillContactInfo(email: string, phone: string) {
    await this.page.getByRole('textbox', { name: 'Email Address' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Phone Number' }).fill(phone);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async fillLeadPassenger(
    title: string,
    firstname: string,
    lastname: string,
    day: string,
    month: string,
    year: string,
    postcode: string,
    address: string,
    city: string,
    country: string
  ) {
    await this.page.getByRole('combobox').first().selectOption(title);
    await this.page.getByRole('textbox').first().fill(firstname);
    await this.page.getByRole('textbox').nth(1).fill(lastname);
    await this.page.getByRole('combobox').nth(1).selectOption(day);
    await this.page.getByRole('combobox').nth(2).selectOption(month);
    await this.page.getByRole('combobox').nth(3).selectOption(year);
    await this.page.getByRole('textbox').nth(4).fill(postcode);
    await this.page.getByRole('textbox').nth(5).fill(address);
    await this.page.locator('input[type="text"]').nth(5).fill(city);
    await this.page.getByRole('combobox').nth(4).selectOption(country);
  }

  async fillSecondPassenger(
    title: string,
    firstname: string,
    lastname: string,
    day: string,
    month: string,
    year: string
  ) {
    await this.page.getByRole('combobox').nth(5).selectOption(title);
    await this.page.locator('section:nth-child(2) > .space-y-6 > .grid.grid-cols-1 > div:nth-child(2) > .w-full').fill(firstname);
    await this.page.locator('section:nth-child(2) > .space-y-6 > .grid.grid-cols-1 > div:nth-child(3) > .w-full').fill(lastname);
    await this.page.locator('section:nth-child(2) > .space-y-6 > div:nth-child(2) > .grid > select').first().selectOption(day);
    await this.page.locator('section:nth-child(2) > .space-y-6 > div:nth-child(2) > .grid > select:nth-child(2)').selectOption(month);
    await this.page.locator('section:nth-child(2) > .space-y-6 > div:nth-child(2) > .grid > select:nth-child(3)').selectOption(year);
  }

  async continuToPayment() {
    await this.page.getByRole('button', { name: 'Continue to Payment' }).click();
  }
}