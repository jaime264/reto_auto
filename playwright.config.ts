import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests', // tu carpeta de pruebas
  timeout: 30 * 1000,     // timeout global por test
  retries: 0,             // reintentos (útil en CI)
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: true,               // no muestra el navegador (puedes cambiar a false)
    screenshot: 'only-on-failure',// 'on', 'only-on-failure' o 'off'
    video: 'retain-on-failure',   // 'on', 'retain-on-failure' o 'off'
    trace: 'retain-on-failure',   // para depurar pruebas fallidas
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});