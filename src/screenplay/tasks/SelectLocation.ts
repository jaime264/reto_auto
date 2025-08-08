import { Page } from '@playwright/test';

export class SelectLocation {
  static async performAs(page: Page) {
    // ▼ Hacer clic en el botón que abre el modal de ubicación
    const openModalButton = page.locator('[data-testid="store-button"][data-fs-delivery="desktop"]');
    await openModalButton.click();
    console.log('🧭 Abriendo modal de selección de ciudad y tienda...');
    
    // ▼ Esperar a que aparezca el modal
    const storeModal = page.locator('[data-testid="store-modal"]');
    await storeModal.waitFor({ state: 'visible', timeout: 1000 });
    await page.waitForTimeout(1000); // esperar que el modal termine de aparecer

    // ▼ Seleccionar ciudad
    const cityDropdown = storeModal.locator('[data-fs-pickup-point-city-select-city="true"]');
    await cityDropdown.click();

    const firstCityOption = page.locator('[id^="react-select-2-listbox"] [role="option"]').first();
    await firstCityOption.waitFor({ state: 'visible', timeout: 5000 });
    await firstCityOption.click();

    await page.waitForTimeout(1000); // esperar a que se habilite el segundo select

    // ▼ Seleccionar tienda
    const storeDropdown = storeModal.locator('[data-fs-pickup-point-city-select-dependency="true"]');
    await storeDropdown.click();

    const firstStoreOption = page.locator('[id^="react-select-3-listbox"] [role="option"]').first();
    await firstStoreOption.waitFor({ state: 'visible', timeout: 5000 });
    await firstStoreOption.click();

    // ▼ Confirmar selección
    const confirmButton = storeModal.locator('[data-testid="store-button"]', { hasText: 'Confirmar' });
    await confirmButton.click();

    await page.waitForTimeout(3000); // esperar a que se cierre el modal
    console.log('Ciudad y tienda seleccionadas correctamente');
  }
}
