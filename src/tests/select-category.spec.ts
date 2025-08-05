import { test } from '../hooks/global-hooks';
import { OpenHomePage } from '../screenplay/tasks/OpenHomePage';
import { SelectRandomCategory } from '../screenplay/tasks/SelectRandomCategory';

test('Seleccionar categoría y subcategoría aleatoria', async ({ page }) => {
  await OpenHomePage.perform(page);
  await SelectRandomCategory.perform(page);
});