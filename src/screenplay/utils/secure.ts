import { Page } from '@playwright/test';

export class secure {
  static async attempt<T>(
    action: () => Promise<T>,
    context: string = 'acción',
    page?: Page
  ): Promise<T | null> {
    try {
      return await action();
    } catch (error) {
      console.warn(`⚠️ Error al ejecutar ${context}:`, error);

      if (page) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `error-${context.replace(/\s+/g, '_')}-${timestamp}.png`;
        await page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
        console.log(`🖼️ Screenshot guardado: screenshots/${filename}`);
      }

      return null;
    }
  }
}
