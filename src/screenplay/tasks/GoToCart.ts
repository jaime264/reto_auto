import { Page } from '@playwright/test';

export class GoToCart {
  static async performAs(page: Page) {
    console.log('🛒 Abriendo el carrito...');

     // ▼ Hacer clic en el ícono del carrito en el header
    const cartIcon = page.locator('[data-fs-navbar-buttons="true"] button:has([data-fs-cart-quantity="true"])');
    await cartIcon.click();

    // ▼ Esperar que se abra el modal del carrito (minicart)
    const miniCartModal = page.locator('[data-fs-modal-minicart="true"]');
    await miniCartModal.waitFor({ state: 'visible', timeout: 5000 });

    // Usar texto del botón directamente
    const goToCartBtn = miniCartModal.getByText('Ver carrito/ Ir a pagar', { exact: true });

    await goToCartBtn.click();
    console.log('Se hizo clic en "Ver carrito/ Ir a pagar"');

    // Esperar la navegación a la vista del carrito
    await page.getByRole('heading', { name: 'Carrito de compras' }).waitFor({ timeout: 5000 });

    // Cerrar modal si aparece
    const closeCartModalBtn = page.locator('[data-molecule-modal-close-button-container="true"] button');
    if (await closeCartModalBtn.isVisible().catch(() => false)) {
      await closeCartModalBtn.click();
      console.log('Modal del carrito cerrado');
    }
  }
}
