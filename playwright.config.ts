import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests', // tu carpeta de pruebas
  timeout: 60 * 1000,     // timeout global por test
  retries: 0,             // reintentos (útil en CI)
  reporter: [['html', { outputFolder: 'playwright-report', open: 'on' }]],
  use: {
    headless: true,               // no muestra el navegador (puedes cambiar a false)
    screenshot: 'on',         // Siempre tomar captura
    video: 'on',              // Siempre grabar video
    trace: 'on',              // Siempre guardar traza
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
     // Cuando termines, descomenta para correr en todos:
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
    */
  ],
});