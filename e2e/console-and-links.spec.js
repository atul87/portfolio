const { test, expect } = require("@playwright/test");

test.describe("Deep Diagnostics: Console, Broken Links & Image Assets", () => {
  test("homepage renders with zero uncaught JavaScript errors", async ({ page }) => {
    const pageErrors = [];
    const severeConsoleErrors = [];

    page.on("pageerror", (err) => pageErrors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        // Exclude network errors from third-party analytics/GTM in test environment
        const text = msg.text();
        if (!text.includes("googletagmanager") && !text.includes("google-analytics")) {
          severeConsoleErrors.push(text);
        }
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(pageErrors, `Page threw uncaught runtime errors: ${pageErrors.join("; ")}`).toEqual([]);
    expect(severeConsoleErrors, `Console logged severe errors: ${severeConsoleErrors.join("; ")}`).toEqual([]);
  });

  test("blog index and reader render with zero uncaught JavaScript errors", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    await page.goto("/blog");
    await page.waitForLoadState("domcontentloaded");
    expect(pageErrors).toEqual([]);

    await page.goto("/blog/civic-tech-beyond-code-civicconnect");
    await page.waitForLoadState("domcontentloaded");
    expect(pageErrors).toEqual([]);
  });

  test("gallery page renders with zero uncaught JavaScript errors", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    await page.goto("/gallery");
    await page.waitForLoadState("domcontentloaded");
    expect(pageErrors).toEqual([]);
  });

  test("all navigation hash anchors resolve to real DOM elements on the homepage", async ({ page }) => {
    await page.goto("/");

    const expectedAnchors = [
      "#about",
      "#experience",
      "#skills",
      "#education",
      "#projects",
      "#research",
      "#contact",
      "#values",
      "#hobbies",
      "#gallery",
    ];

    for (const anchor of expectedAnchors) {
      const el = page.locator(anchor);
      await expect(el, `Expected target anchor '${anchor}' to exist on homepage`).toHaveCount(1);
      await expect(el).toBeAttached();
    }
  });

  test("all visible images on the homepage load successfully without broken 404s", async ({ page, request }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Extract all image sources from the page
    const imageSrcs = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return Array.from(new Set(imgs.map((img) => img.currentSrc || img.src).filter(Boolean)));
    });

    expect(imageSrcs.length).toBeGreaterThan(0);

    // Verify every single image URL on the page responds with 200 OK
    for (const src of imageSrcs) {
      if (src.startsWith("data:")) continue;
      const res = await request.get(src);
      expect(res.status(), `Image resource at ${src} returned status ${res.status()}`).toBe(200);
    }
  });
});
