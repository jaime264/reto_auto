import { Page } from '@playwright/test';

export class Click {
  static on = (selector: string) => async (page: Page) => {
    await page.click(selector);
  };
}
