const { test, expect } = require("@playwright/test");

test("blog page loads with heading or empty-state", async ({ page }) => {
    await page.goto("/blog");

    await expect(page.getByText("All Blog")).toBeVisible();
    await expect(
        page.getByText("No blog posts are connected yet. Please check back later.")
    ).toBeVisible();
});
