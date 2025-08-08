import { Page } from '@playwright/test';

export class AvailableQuantity {
  static async answeredBy(page: Page): Promise<number> {
    const quantitySpan = page.locator('[data-fs-product-details-seller__name="true"]');

    if (await quantitySpan.isVisible({ timeout: 3000 }).catch(() => false)) {
      const quantityText = await quantitySpan.innerText();
      const availableQuantity = parseInt(quantityText.trim());
      if (!isNaN(availableQuantity) && availableQuantity < 10) {
        return availableQuantity;
      }
    }

    return 10; // Valor por defecto
  }
}