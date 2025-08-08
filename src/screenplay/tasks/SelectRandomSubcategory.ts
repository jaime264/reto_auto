import { Page, expect } from '@playwright/test';

export const SelectRandomSubcategory = {
  async performAs(page: Page) {
    const subMenu = page.locator('div[data-isopen="true"]');
    await subMenu.waitFor({ state: 'visible', timeout: 15000 });

    const subcategoryLinks = subMenu.locator('ul[data-content-list="true"] li a:visible');
    await subcategoryLinks.first().waitFor({ state: 'visible', timeout: 15000 });

    const total = await subcategoryLinks.count();
    expect(total).toBeGreaterThan(0);

    const pick = Math.floor(Math.random() * total);
    const chosen = subcategoryLinks.nth(pick);

    const subName = (await chosen.innerText()).trim();
    console.log(`Subcategoría seleccionada: ${subName}`);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }),
      chosen.click(),
    ]);
  }
};