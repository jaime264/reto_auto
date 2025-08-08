import { Page } from '@playwright/test';

export class Shopper {
  constructor(private page: Page) {}

  async attemptsTo<T>(...tasks: Array<{ performAs(page: Page): Promise<T> }>): Promise<T[]> {
    const results: T[] = [];

    for (const task of tasks) {
      const result = await task.performAs(this.page);
      results.push(result);
    }

    return results;
  }
}
