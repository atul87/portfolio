const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./e2e",
    timeout: 30 * 1000,
    expect: {
        timeout: 5 * 1000,
    },
    fullyParallel: true,
    retries: 0,
    workers: 1,
    reporter: "list",
    use: {
        baseURL: "http://127.0.0.1:3000",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
    webServer: {
        command: "npm run build && npm run start",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: true,
        timeout: 180 * 1000,
    },
});
