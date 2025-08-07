import { Page, expect } from '@playwright/test';

export class SelectRandomSubcategory {
  static async performAs(page: Page): Promise<boolean> {
    const subMenu = page.locator('div[data-isopen="true"]');
    await subMenu.waitFor({ state: 'visible', timeout: 10000 });

    const subcategoryLinks = subMenu.locator('ul[data-content-list="true"] li a:visible');
    await subcategoryLinks.first().waitFor({ state: 'visible', timeout: 10000 });

    const total = await subcategoryLinks.count();
    expect(total).toBeGreaterThan(0);

    const pick = Math.floor(Math.random() * total);
    const chosen = subcategoryLinks.nth(pick);

    const subName = (await chosen.innerText()).trim();
    console.log(`📌 Subcategoría seleccionada: ${subName}`);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }),
      chosen.click(),
    ]);

    // Validar si hay productos en la grilla
    const products = page.locator('[data-fs-product-grid] a[data-testid="product-link"]');

    try {
      await expect(products.first()).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      console.warn('⚠️ No se encontraron productos en la subcategoría seleccionada.');
      return false;
    }
  }
}
