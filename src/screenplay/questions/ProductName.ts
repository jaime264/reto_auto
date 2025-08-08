import { expect, Page } from "playwright/test";

export class ProductName {
  static async answeredBy(page: Page): Promise<string> {
    const nameLocator = page.locator('header[data-fs-product-details-title="true"] h1:visible').first();
    await expect(nameLocator).toBeVisible({ timeout: 10000 });
    return (await nameLocator.textContent())?.trim() ?? 'Nombre no disponible';
  }
}
