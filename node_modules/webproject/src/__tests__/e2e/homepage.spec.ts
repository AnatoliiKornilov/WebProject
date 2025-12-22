import { test, expect } from '@playwright/test';

test('Проверка навигации', async ({ page }) => {
  await page.goto('https://playwright.dev');
  
  // Проверяем заголовок
  await expect(page).toHaveTitle(/Playwright/);
  
  // Проверяем навигацию
  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  
  console.log('✅ Навигация работает');
});
