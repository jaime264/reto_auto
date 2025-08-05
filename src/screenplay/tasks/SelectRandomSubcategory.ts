import { Page, expect } from '@playwright/test';

export class SelectRandomSubcategory {
  static async performAs(page: Page) {
    // El submenú aparece con data-isopen="true". Dentro hay listas de subcategorías.
    // Esperamos un contenedor que tenga ul[data-content-list="true"]
    const subMenu = page.locator('div[data-isopen="true"]');
    await subMenu.waitFor({ state: 'visible', timeout: 10000 });

    // Dentro del submenú, las subcategorías están en ul[data-content-list="true"] li a
    const subcategoryLinks = subMenu.locator('ul[data-content-list="true"] li a:visible');
    await subcategoryLinks.first().waitFor({ state: 'visible', timeout: 10000 });

    const total = await subcategoryLinks.count();
    expect(total).toBeGreaterThan(0);

    const pick = Math.floor(Math.random() * total);
    const chosen = subcategoryLinks.nth(pick);

    const subName = (await chosen.innerText()).trim();
    console.log(`Subcategoría seleccionada: ${subName}`);

    await chosen.click();

    // Validar que navegamos a un listado (hay productos)
    await page.waitForLoadState('domcontentloaded');
    // Heurística simple: que exista una grilla/listado de productos
    const productsGrid = page.locator('[data-fs-product-grid], [data-fs-product-summary], [data-testid="product-summary"], section:has([data-fs-product-card])');
    await expect(productsGrid.first()).toBeVisible({ timeout: 15000 });
  }
}
