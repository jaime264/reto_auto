import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Extender el test para agregar la captura automática al final
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page); // Ejecuta el test original

    const carpeta = testInfo.status === 'passed' ? 'exitosos' : 'fallidos';
    const evidenciaDir = path.join(__dirname, `../../evidencia/${carpeta}`);
    if (!fs.existsSync(evidenciaDir)) {
      fs.mkdirSync(evidenciaDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `captura-${timestamp}.png`;

    await page.screenshot({
      path: path.join(evidenciaDir, fileName),
      fullPage: true,
    });

    console.log(`📸 Captura guardada en: ${carpeta}/${fileName}`);
  }
});

// Reexportar expect para que se pueda usar igual que antes
export { expect };
