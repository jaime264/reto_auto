import { Page, expect } from '@playwright/test';

export const HasVisibleProducts = {
  async answeredBy(page: Page): Promise<boolean> {
    const product = page.locator('[data-fs-product-grid] a[data-testid="product-link"]').first();

    try {
      await expect(product).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      console.warn('⚠️ No se encontraron productos en la subcategoría seleccionada.');
      return false;
    }
  }
};
