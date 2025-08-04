import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Abrir página de Éxito y tomar captura', async ({ page }) => {
  // Navegar a la web
  await page.goto('https://www.exito.com/');

  // Verificar que el título contenga "Éxito"
  await expect(page).toHaveTitle(/Éxito/i);

  // Crear carpeta evidencia/ si no existe
  const evidenciaDir = path.join(__dirname, '../../evidencia');
  if (!fs.existsSync(evidenciaDir)) {
    fs.mkdirSync(evidenciaDir);
  }

  // Tomar la captura
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `${evidenciaDir}/captura-exito-${timestamp}.png`,
    fullPage: true,
  });
});
