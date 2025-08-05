import { Page } from '@playwright/test';

export class AcceptCookies {
  static async performAs(page: Page) {
    // Espera breve por el modal de cookies si aparece
    const cookiesModal = page.locator('section[class*="fsCookiesModal"]');
    if (await cookiesModal.first().isVisible().catch(() => false)) {
      // Botones típicos para cerrar/aceptar
      const acceptBtn = cookiesModal.getByRole('button', {
        name: /aceptar|entendido|aceptar todas|aceptar y cerrar|ok/i
      }).first();

      if (await acceptBtn.isVisible().catch(() => false)) {
        await acceptBtn.click().catch(() => {});
      } else {
        // Fallback por si el botón no tiene accesible role/name
        const anyClose = cookiesModal.locator('button:visible, [data-fs-button]:visible').first();
        if (await anyClose.isVisible().catch(() => false)) {
          await anyClose.click().catch(() => {});
        }
      }

      // Esperar a que ya no intercepte clicks
      await cookiesModal.first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }
  }
}
