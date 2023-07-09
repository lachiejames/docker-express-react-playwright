// Import the "test" function from Playwright Test.
import { test } from "@playwright/test";

// Define a test case.
test('should display "Hello, World!" text on page', async ({ page }) => {
  // Navigate to localhost:3000/ (baseUrl from playwright.config.ts).
  await page.goto("/");
  // Wait for the text "Learn React" to appear on the page.
  await page.locator("text=Learn React").waitFor();
});
