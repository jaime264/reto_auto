import { Page } from '@playwright/test';

export class FinalCartQuantity {
  static async answeredBy(page: Page): Promise<number> {
    const quantityInput = page.locator('[data-fs-container-buybutton="true"] input');
    const inputValue = await quantityInput.inputValue();
    return parseInt(inputValue.trim(), 10);
  }
}