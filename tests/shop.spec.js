const { test, expect } = require('@playwright/test');

test('Login, add iPhone X to cart and verify checkout', async ({ page }) => {
  // 1) Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // 2) Fill credentials
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');

  // 3) Select user and accept popup
  await page.locator('input[value="user"]').click();
  await page.locator('#okayBtn').click();
  
  // Wait for modal to fade out (Bootstrap modal removes 'show' class)
  await page.locator('#myModal.show').waitFor({ state: 'hidden', timeout: 10000 });

  // 4) Sign in
  await page.locator('#terms').check();
  await Promise.all([
    page.waitForURL(/.*angularpractice\/shop/, { waitUntil: 'domcontentloaded' }),
    page.locator('#signInBtn').click(),
  ]);

  // 5) Wait for product listing
  await page.locator('app-card').first().waitFor({ state: 'visible', timeout: 30000 });

  // 6) Add iPhone X to cart
  const iPhoneCard = page.locator('app-card', { hasText: 'iphone X' });
  await iPhoneCard.locator('button').click();

  // 7) Confirm cart counter updated to 1
  const checkoutLink = page.locator('text=Checkout').first();
  await expect(checkoutLink).toContainText('1');

  // 8) Go to checkout
  await checkoutLink.click();

  // 9) Confirm iPhone X is listed in the checkout table
  await expect(page.locator('h4.media-heading', { hasText: /iphone X/i })).toBeVisible();
});
