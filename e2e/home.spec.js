const { test, expect } = require("@playwright/test");

test("home page renders key sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("nav").getByRole("link", { name: "Atul" })).toBeVisible();
    await expect(page.locator('a[href="#contact"] button')).toBeVisible();
    await expect(page.getByRole("link", { name: "ABOUT" })).toBeVisible();
    await expect(page.getByRole("link", { name: "EXPERIENCE" })).toBeVisible();
    await expect(page.getByRole("link", { name: "SKILLS" })).toBeVisible();
    await expect(page.getByRole("link", { name: "PROJECTS" })).toBeVisible();

    await expect(page.locator("#contact")).toBeVisible();
});
