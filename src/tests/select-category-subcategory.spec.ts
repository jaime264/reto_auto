// src/tests/select-category-subcategory.spec.ts
import { test } from '../hooks/global-hooks';
import { SelectRandomCategory } from '../screenplay/tasks/SelectRandomCategory';
import { SelectRandomSubcategory } from '../screenplay/tasks/SelectRandomSubcategory';

test('Seleccionar categoría y subcategoría aleatoria', async ({ page }) => {
  await page.goto('https://www.exito.com/', { waitUntil: 'domcontentloaded' });

  await SelectRandomCategory.performAs(page);
  await SelectRandomSubcategory.performAs(page);
});
