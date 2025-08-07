import { Page, expect } from '@playwright/test';
import { Product } from '../models/Product';
import { parsePrice } from '../utils/parsePrice';


export class AddRandomQuantityToCart {
  static async performAs(page: Page): Promise<Product> {

    const drawer = page.locator('#drawer');
    if (await drawer.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log('🛍️ Modal de recomendación detectado');

      const closeDrawerBtn = drawer.locator('[data-fs-drawer-close-button="true"]');

      if (await closeDrawerBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await closeDrawerBtn.dispatchEvent('click');
         // ← Sí se puede hacer clic, aunque sea un <span>
        console.log('❌ Modal de recomendación cerrado');
      }
    }


    // Capturar nombre del producto
    const nameLocator = page.locator('header[data-fs-product-details-title="true"] h1:visible').first();

    await expect(nameLocator).toBeVisible({ timeout: 10000 });
    const name = (await nameLocator.textContent())?.trim() ?? 'Nombre no disponible';

    // Capturar precio y convertirlo a number
    const priceLocator = page.locator('[data-fs-container-price-otros]');
    const priceText = (await priceLocator.first().textContent()) ?? '$0';
    const price = parsePrice(priceText);

    // Hacer clic en "Agregar al carrito"
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

     // Validar si aparece la talla máxima disponible
    const dropdown = page.locator('[data-fs-content-size-selector=true]');
    if (await dropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
      await dropdown.click();
      const firstOption = page.locator('[role="option"]:visible').first();
      await firstOption.click();
    }

    // Validar si aparece la cantidad máxima disponible
    let maxQuantity = 10;
    const quantitySpan = page.locator('[data-fs-product-details-seller__name="true"]');
    if (await quantitySpan.isVisible({ timeout: 3000 }).catch(() => false)) {
      const quantityText = await quantitySpan.innerText();
      const availableQuantity = parseInt(quantityText.trim());
      if (!isNaN(availableQuantity) && availableQuantity < 10) {
        maxQuantity = availableQuantity;
      }
    }

    // Generar cantidad aleatoria y asignarla
    let quantity = Math.floor(Math.random() * maxQuantity) + 1;
    const plusButton = page.locator('#container-buybutton').locator('button:has(use[href*="icon-outlined-more_mas_agregar_selector"])');
    for (let i = 1; i < quantity; i++) {
      await plusButton.click();
      await page.waitForTimeout(200); // evitar click demasiado rápido
    }

    
    // 3. Obtener valor final desde el input visible
    const quantityInput = page.locator('[data-fs-container-buybutton="true"] input');
    const inputValue = await quantityInput.inputValue();

    // 4. Asignar valor exacto como número
    quantity = parseInt(inputValue.trim(), 10);


    return {
      name,
      price,
      quantity
    };
  }
}
