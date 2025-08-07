import { test, expect } from '@playwright/test';
import { SelectLocation } from '../screenplay/tasks/SelectLocation';
import { AcceptCookies } from '../screenplay/tasks/AcceptCookies';
import { clearSession } from '../screenplay/utils/clearSession';

test('Seleccionar ubicación (ciudad y tienda) correctamente', async ({ page }) => {
    await page.goto('https://www.exito.com/');
    await page.waitForLoadState('domcontentloaded'); // Esperar que cargue el DOM

    await clearSession(page); // Ahora sí: limpiar después de que el DOM existe
    await page.reload(); // Recargar para que se apliquen los cambios de storage limpio
    await page.waitForLoadState('domcontentloaded');

    // 1. Aceptar cookies si aparecen
    await AcceptCookies.performAs(page);

    // Ejecutar la selección de ubicación
    await SelectLocation.performAs(page);

    // Validar que ya no se muestre el modal de selección
    const storeModal = page.locator('[data-fs-modal-content="true"]');
    await expect(storeModal).toHaveCount(0, { timeout: 3000 });

    console.log('✅ Test de ubicación finalizado correctamente');
});
