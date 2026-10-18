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

  test("IEEE research publications have working DOI external links", async ({ page }) => {
    await page.goto("/");

    const iscsPaper = page.locator('a[href="https://doi.org/10.1109/ISCS69371.2025.11386415"]');
    await expect(iscsPaper).toBeVisible();
    await expect(iscsPaper).toHaveAttribute("target", "_blank");

    const sceecsPaper = page.locator('a[href="https://doi.org/10.1109/SCEECS68810.2026.11429932"]');
    await expect(sceecsPaper).toBeVisible();
    await expect(sceecsPaper).toHaveAttribute("target", "_blank");
  });

  test("LinkedIn profile links point to atulatul87 in hero and footer", async ({ page }) => {
    await page.goto("/");

    const linkedinHero = page.locator('a[aria-label="LinkedIn Profile"]').first();
    await expect(linkedinHero).toBeVisible();
    await expect(linkedinHero).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/atulatul87"
    );

    const linkedinFooter = page.locator('footer a[aria-label="LinkedIn Profile"], div.relative a[aria-label="LinkedIn Profile"]').first();
    await expect(linkedinFooter).toBeVisible();
  });

  test("resume button has standardized branded download attribute", async ({ page }) => {
    await page.goto("/");

    const resumeBtn = page.getByRole("button", { name: "Get Resume" });
    await expect(resumeBtn).toBeVisible();
    await expect(resumeBtn).toHaveAttribute("download", "Atul_Verma_AI_ML_Resume.pdf");
  });

  test("ResearchGate profile links exist and point to valid profile", async ({ page }) => {
    await page.goto("/");

    // Hero Section
    const rgHero = page.locator('a[aria-label="ResearchGate Profile"]').first();
    await expect(rgHero).toBeVisible();
    await expect(rgHero).toHaveAttribute(
      "href",
      "https://www.researchgate.net/profile/Atul-Atul-10?ev=hdr_xprf"
    );
    await expect(rgHero).toHaveAttribute("target", "_blank");

    // Research Section
    const rgResearch = page.locator('a[aria-label="ResearchGate Profile - Atul"]');
    await expect(rgResearch).toBeVisible();
    await expect(rgResearch).toHaveAttribute(
      "href",
      "https://www.researchgate.net/profile/Atul-Atul-10?ev=hdr_xprf"
    );

    // Footer
    const rgFooter = page.locator('footer a[aria-label="ResearchGate Profile"], div.relative a[aria-label="ResearchGate Profile"]').first();
    await expect(rgFooter).toBeVisible();
  });
});

