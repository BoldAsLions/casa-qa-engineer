import { test, expect } from '@playwright/test';

test.describe('Vault Health Dashboard - Critical Path', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://app-stg.keys.casa/qa_hire_q1_2026');
  });

    test('Device Status: Connected devices display correct status', async ({ page }) => {
    await expect(page.getByText('Ledger Nano X')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
    await expect(page.getByText('Trezor Model T')).toBeVisible();
    await expect(page.getByText('Firmware Update Required')).toBeVisible();
    await expect(page.getByText('Coldcard Q')).toBeVisible();
    await expect(page.getByText('Not Connected')).toBeVisible();
  });

    test('Financial Integrity: Vault balance is visible and formatted as BTC', async ({ page }) => {
    const balance = page.locator('[data-testid="total-balance"]');
    await expect(balance).toBeVisible();
    await expect(balance).toHaveText(/[\d.]+\s*BTC/);
    await expect(balance).toContainText('1.8453');
  });

test('Critical: Copy button must preserve full address string', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const expectedAddress = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';
  await page.locator('button:has-text("Copy")').first().click();
  const copiedAddress = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedAddress).toBe(expectedAddress);
});

  test('Critical: All addresses copy completely', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const EXPECTED_ADDRESSES = [
      '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      'tb1qrp33g0q5b5698ahp5jnf5yzjmgcem8tlculdaf',
      'bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3s28',
      '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC'
    ];

    const copyButtons = page.locator('button:has-text("Copy")');

    for (let i = 0; i < EXPECTED_ADDRESSES.length; i++) {
      await copyButtons.nth(i).click();
      const copiedAddress = await page.evaluate(() => navigator.clipboard.readText());
      expect(copiedAddress).toBe(EXPECTED_ADDRESSES[i]);
    }
  });
});