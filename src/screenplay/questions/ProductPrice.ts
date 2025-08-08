import { Page } from '@playwright/test';
import { parsePrice } from '../utils/parsePrice';

export class ProductPrice {
  static async answeredBy(page: Page): Promise<number> {
    const priceLocator = page.locator('[data-fs-container-price-otros]');
    const priceText = (await priceLocator.first().textContent()) ?? '$0';
    return parsePrice(priceText);
  }
}