import { Page } from '@playwright/test';
import { Product } from '../models/Product';
import { ProductName } from '../questions/ProductName';
import { ProductPrice } from '../questions/ProductPrice';
import { AvailableQuantity } from '../questions/AvailableQuantity';
import { FinalCartQuantity } from '../questions/FinalCartQuantity';

export class AddRandomQuantityToCart {
  static async performAs(page: Page): Promise<Product> {
    // Cerrar modal de recomendaciones si aparece
    const drawer = page.locator('#drawer');
    if (await drawer.isVisible({ timeout: 3000 }).catch(() => false)) {
      const closeDrawerBtn = drawer.locator('[data-fs-drawer-close-button="true"]');
      if (await closeDrawerBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await closeDrawerBtn.dispatchEvent('click');
        console.log('Modal de recomendación cerrado');
      }
    }

    // Obtener nombre y precio (Questions)
    const name = await ProductName.answeredBy(page);
    const price = await ProductPrice.answeredBy(page);

    // Agregar producto al carrito
    const addButton = page.locator('#container-buybutton button span', { hasText: 'Agregar' });
    await addButton.first().click();

    // Cerrar modal de garantía si aparece
    const warrantyModal = page.locator('header[data-fs-warranty-header="true"]');
    if (await warrantyModal.isVisible({ timeout: 3000 }).catch(() => false)) {
      const closeButton = warrantyModal.locator('[data-testid="store-button"]');
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }
    }

    // Seleccionar talla si aparece
    const dropdown = page.locator('[data-fs-content-size-selector=true]');
    if (await dropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
      await dropdown.click();
      const firstOption = page.locator('[role="option"]:visible').first();
      await firstOption.click();
    }

    // Obtener cantidad máxima disponible
    const maxQuantity = await AvailableQuantity.answeredBy(page);

    // Generar cantidad aleatoria y aumentar producto
    let quantity = Math.floor(Math.random() * maxQuantity) + 1;
    const plusButton = page.locator('#container-buybutton').locator('button:has(use[href*="icon-outlined-more_mas_agregar_selector"])');

    for (let i = 1; i < quantity; i++) {
      await plusButton.click();
      await page.waitForTimeout(200);
    }

    // Obtener cantidad final real del input
    quantity = await FinalCartQuantity.answeredBy(page);

    return { name, price, quantity };
  }
}
