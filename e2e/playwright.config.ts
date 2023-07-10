// Import necessary modules and the "devices" definition from Playwright.
import { PlaywrightTestConfig, devices } from "@playwright/test";

// Check if this script is running in a Continuous Integration (CI) environment.
const isCI = Boolean(process.env.CI);

// Define the configuration for Playwright Test.
const config: PlaywrightTestConfig = {
  // Execute the global setup script before any tests are run.
  globalSetup: `${__dirname}/utils/globalSetup`,
  // Execute the global teardown script after all tests are run.
  globalTeardown: `${__dirname}/utils/globalTeardown`,
  // In a CI environment, prevent test files or suites that are exclusively specified with ".only".
  forbidOnly: isCI,
  // In a CI environment, retry failed tests once. Otherwise, don't retry failed tests.
  retries: isCI ? 1 : 0,
  // Allow multiple workers to run tests at the same time.
  fullyParallel: true,
  // Use three workers to run tests.
  workers: 3,
  // Limit the execution time of each test to 60,000 ms.
  timeout: 60000,
  // Set the configuration used by every test.
  use: {
    // In a CI environment, run tests in headless mode. Otherwise, show the browser UI.
    headless: isCI,
    // The base URL used by page.goto().
    baseURL: "http://localhost:3000",
    // The viewport size for each page.
    viewport: { width: 1920, height: 1080 },
    // Record video for each test.
    video: {
      mode: "on",
      size: { width: 1920, height: 1080 },
    },
  },
  // The directory containing test files.
  testDir: "./src",
  // The directory to write test result files.
  outputDir: "e2e-test-results/",
  // The pattern to find test files.
  testMatch: ["*.test.ts"],
  // The reporters used to generate test results.
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "e2e-report" }],
    ["junit", { outputFile: "e2e-report/results.xml" }],
  ],
  // The browsers to run tests.
  projects: [
    {
      name: "chromium",
      // Use the pre-configured device descriptor for "Desktop Chrome".
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};

// Export the configuration for use by Playwright Test.
export default config;
