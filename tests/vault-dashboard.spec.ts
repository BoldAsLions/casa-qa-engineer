import { test, expect } from '@playwright/test';

test.describe('Vault Health Dashboard - Critical Path', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the provided assessment URL
    await page.goto('https://app-stg.keys.casa/qa_hire_q1_2026');
  });

test('Critical: Copy button must preserve full address string', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('https://app-stg.keys.casa/qa_hire_q1_2026');

  const expectedAddress = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';
  
  // Click copy
  await page.locator('button:has-text("Copy")').first().click();
  
  // Give the browser a moment to populate the clipboard
  const copiedAddress = await page.evaluate(() => navigator.clipboard.readText());
  
  // Assert
  expect(copiedAddress).toBe(expectedAddress);
});

  test('Security: Unauthenticated access is redirected to login', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('https://app-stg.keys.casa/qa_hire_q1_2026');
    await expect(page).toHaveURL(/.*login/);
  });
});