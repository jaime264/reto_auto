import { Page, expect } from '@playwright/test';

export const SelectRandomCategory = {
  async performAs(page: Page) {
    // 1) Asegúrate de haber abierto el menú antes
    await page.locator('[data-fs-menu-container="true"]').click();

    // 2) Lista de secciones dentro del aside
    const sectionsList = page.locator('aside ul[data-list-sections="true"]');
    await sectionsList.first().waitFor({ state: 'visible', timeout: 15000 });

    // 3) Tomar el segundo <section> dentro de la lista
    const categoriesSection = sectionsList
      .locator('> section')
      .filter({ has: page.locator('header', { hasText: /categor[ií]as/i }) })
      .first();

    // 4) Tomar los <li> dentro de esa sección
    const categoryItems = categoriesSection.locator('li[class*="Link_link-container"]');
    const total = await categoryItems.count();
    if (total === 0) throw new Error('No se encontraron categorías en la sección "Categorías".');

    // 5) Seleccionar aleatoriamente una categoría
    const idx = Math.floor(Math.random() * total);
    const selectedCategory = categoryItems.nth(idx);

    // Obtener texto de la categoría
    const categoryText = await selectedCategory.innerText();
    console.log(`Categoría seleccionada: ${categoryText.trim()}`);

    // Hacer clic
    await selectedCategory.click();

    // 6) Esperar a que se abra el submenú correspondiente
    const subMenu = page.locator(
      'div[class*="SubMenu_submenu-container"][data-isopen="true"] ul[data-content-list="true"]'
    );
    await expect(subMenu.first()).toBeVisible({ timeout: 15000 });
  }
};
