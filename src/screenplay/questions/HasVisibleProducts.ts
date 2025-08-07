import { Page } from '@playwright/test';

export const HasVisibleProducts = {
  async answeredBy(page: Page): Promise<boolean> {
    const product = page.locator('[data-fs-product-grid] a[data-testid="product-link"]').first();
    return await product.isVisible();
  }
};
