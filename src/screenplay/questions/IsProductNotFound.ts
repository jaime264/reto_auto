import { Page } from "playwright/test";

export const IsProductNotFound = {
  async answeredBy(page: Page): Promise<boolean> {
    const notFound = page.locator('[data-fs-info-not-found="true"]');
    return await notFound.isVisible({ timeout: 3000 }).catch(() => false);
  }
};
