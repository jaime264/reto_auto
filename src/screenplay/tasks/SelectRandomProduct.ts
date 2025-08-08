import { Page, expect } from '@playwright/test';
import { IsProductNotFound } from '../questions/IsProductNotFound';

export class SelectRandomProduct {
  static async performAs(page: Page): Promise<boolean | null> {
    // Este selector apunta a los <a> que redirigen a la página del producto desde la grilla
    const products = page.locator('[data-fs-product-grid] a[data-testid="product-link"]:visible');

    // Esperar que al menos un producto sea visible
    await expect(products.first()).toBeVisible({ timeout: 10000 });

    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    const random = Math.floor(Math.random() * count);
    const selected = products.nth(random);
    const href = await selected.getAttribute('href');

    console.log(`Producto seleccionado: ${href}`);

    await selected.click();

    // Verificar si aparece el error 404
    const notFound = await IsProductNotFound.answeredBy(page);
    if (notFound) {
      console.warn('Producto no disponible (404). Se omite.');
      return false;
    }

    // Confirmar que se redirigió a la página del producto (esperar el botón de agregar)
    const buyButton = page.locator('#container-buybutton button:has-text("Agregar")');
    await expect(buyButton.first()).toBeVisible({ timeout: 15000 });


    return true;
  }
}
