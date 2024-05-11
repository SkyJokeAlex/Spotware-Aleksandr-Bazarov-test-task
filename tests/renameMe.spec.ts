import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

test.describe('Smoke Placed Order', () => {
    test('Positions counter shows Placed Order ', async ({ page }) => {
        await page.locator('.todo-list li .toggle').first().check();
        await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
      });
});
