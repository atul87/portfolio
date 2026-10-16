const { test, expect } = require("@playwright/test");

test.describe("Navigation and External Links", () => {
  test("GeeksforGeeks profile links exist and point to valid profile", async ({ page }) => {
    await page.goto("/");

    const gfgHero = page.locator('a[aria-label="GeeksforGeeks Profile"]').first();
    await expect(gfgHero).toBeVisible();
    await expect(gfgHero).toHaveAttribute(
      "href",
      "https://www.geeksforgeeks.org/profile/atul8756"
    );
    await expect(gfgHero).toHaveAttribute("target", "_blank");
  });

  test("mobile menu toggles and responds to Escape key", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const menuBtn = page.getByLabel("Open navigation menu");
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Menu drawer should be open
    await expect(page.getByRole("link", { name: "ABOUT" })).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(page.getByLabel("Open navigation menu")).toBeVisible();
  });

  test("verified project demos are available from their cards", async ({ page }) => {
    await page.goto("/");

    const myCityDemo = page.locator('a[href="https://my-city-help.vercel.app"]');
    await expect(myCityDemo).toBeVisible();
    await expect(myCityDemo).toHaveAttribute("target", "_blank");

    const cropDemo = page.locator('a[href="https://crop-recommendation-system-bice.vercel.app"]');
    await expect(cropDemo).toBeVisible();
  });
});
