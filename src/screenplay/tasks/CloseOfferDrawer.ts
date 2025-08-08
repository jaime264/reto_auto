import { Page } from '@playwright/test';

export class CloseOfferDrawer {
  static async performAs(page: Page): Promise<void> {
    await page.evaluate(() => {
      const drawers = document.querySelectorAll('[data-fs-drawer-multi-offer="true"]');
      drawers.forEach(drawer => {
        const parent = drawer.closest('div');
        if (parent) parent.remove();
      });
    });
  }
}

