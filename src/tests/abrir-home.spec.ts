import { test, expect } from '../hooks/global-hooks';
import { OpenHomePage } from '../screenplay/tasks/OpenHomePage';

test('Abrir página de Éxito y validar logo', async ({ page }) => {
  await OpenHomePage.perform(page);
});