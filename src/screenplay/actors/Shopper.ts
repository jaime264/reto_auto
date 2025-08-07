import { Page } from '@playwright/test';

export class Shopper {
  constructor(private page: Page) {}

  async attemptsTo(...tasks: Array<{ performAs(page: Page): Promise<void> }>) {
    for (const task of tasks) {
      await task.performAs(this.page);
    }
  }
}
