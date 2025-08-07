import { Page } from '@playwright/test';

export class CloseOfferDrawer {
  static async performAs(page: Page) {
    const offerDrawer = page.getByText('Ofertas adicionalesBaloncesto', { exact: true }).first();

    // Verificar si el modal está visible
    if (await offerDrawer.isVisible().catch(() => false)) {
      console.log('🎁 Modal de ofertas adicionales detectado');

      // Esperar a que el botón de cerrar esté disponible
      const closeButton = offerDrawer.locator('[data-fs-drawer-close-button="true"]');

      await closeButton.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
      await closeButton.click().catch(() => console.warn('⚠️ No se pudo hacer click en el botón de cerrar'));

      // Esperar a que se cierre el modal
      await page.waitForTimeout(1000);
      console.log('❌ Modal de ofertas cerrado');
    } else {
      console.log('✅ No se abrió modal de ofertas');
    }
  }
}
