import { Page } from '@playwright/test';

export class OpenHomePage {
  static perform = async (page: Page) => {
    await page.goto('https://www.exito.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForSelector('img[alt="logo"]', { timeout: 15000 });
  };
}
