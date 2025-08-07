import { test, expect } from '@playwright/test';
import { SelectRandomCategory } from '../screenplay/tasks/SelectRandomCategory';
import { SelectRandomSubcategory } from '../screenplay/tasks/SelectRandomSubcategory';

test('Seleccionar categoría y subcategoría y validar productos', async ({ page }) => {
  await page.goto('https://www.exito.com/');
  await page.waitForLoadState('domcontentloaded');

  // Aceptar cookies si aparecen
  const cookiesButton = page.getByRole('button', { name: /aceptar/i });
  if (await cookiesButton.isVisible()) {
    await cookiesButton.click();
  }

  // Seleccionar categoría y esperar el submenú
  console.log('📂 Seleccionando categoría...');
  await SelectRandomCategory(page);

  // Seleccionar subcategoría y validar navegación
  console.log('📁 Seleccionando subcategoría...');
  await SelectRandomSubcategory.performAs(page);
});
