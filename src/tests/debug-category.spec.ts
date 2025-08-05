import { test, expect } from '@playwright/test';
import { SelectRandomCategory } from '../screenplay/tasks/SelectRandomCategory';

test('abre el submenú al elegir una categoría', async ({ page }) => {
  await page.goto('https://www.exito.com/');
  await page.waitForLoadState('domcontentloaded');

  const cookiesButton = page.getByRole('button', { name: /aceptar/i });
  if (await cookiesButton.isVisible()) await cookiesButton.click();

  const subMenu = await SelectRandomCategory(page);

  const subCount = await subMenu.locator('li a').count();
  expect(subCount).toBeGreaterThan(0);

  // (Opcional) imprimir las subcategorías
  for (let i = 0; i < Math.min(subCount, 10); i++) {
    console.log(await subMenu.locator('li a').nth(i).innerText());
  }
});


