import { Page } from '@playwright/test';

export async function clearSession(page: Page) {
  // Limpiar cookies
  await page.context().clearCookies();

  // Limpiar localStorage y sessionStorage
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  console.log('🧹 Caché, cookies y almacenamiento limpiados');
}
