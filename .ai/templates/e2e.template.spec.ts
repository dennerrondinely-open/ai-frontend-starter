// Template: teste E2E Playwright.
// Salve em: e2e/{{name}}.spec.ts
// Lembre-se: e2e é caro. Reserve para fluxos críticos do produto.

import { test, expect } from '@playwright/test';

test.describe('{{Name}}', () => {
  test('fluxo principal', async ({ page }) => {
    await page.goto('/{{path}}');

    await expect(page.getByRole('heading', { name: /{{title}}/i })).toBeVisible();

    // TODO: simular interação
    // await page.getByLabel(/email/i).fill('user@example.com');
    // await page.getByRole('button', { name: /entrar/i }).click();

    // TODO: verificar resultado esperado
    // await expect(page).toHaveURL(/\/dashboard/);
  });
});
