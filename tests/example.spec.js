const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect the page to contain the text "Playwright".
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the "Get started" link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expect the page to have a URL containing "intro".
  await expect(page).toHaveURL(/.*intro/);
});
