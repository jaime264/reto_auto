// src/tests/debug-category-subcategory.spec.ts
import { test } from '../hooks/global-hooks';
import { SelectRandomCategory } from '../screenplay/tasks/SelectRandomCategory';
import { SelectRandomSubcategory } from '../screenplay/tasks/SelectRandomSubcategory';

test('Probar selección de categoría y subcategoría', async ({ page }) => {
  await page.goto('https://www.exito.com/', { waitUntil: 'domcontentloaded' });

  console.log('--- Seleccionando Categoría ---');
  await SelectRandomCategory.performAs(page);

  console.log('--- Seleccionando Subcategoría ---');
  await SelectRandomSubcategory.performAs(page);

  // Esperar un poco para ver el resultado antes de cerrar
  await page.waitForTimeout(5000);
});
