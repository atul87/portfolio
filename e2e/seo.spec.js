const { test, expect } = require("@playwright/test");

test.describe("SEO and Metadata Suite", () => {
  test("robots.txt is generated and contains sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-agent:\s*\*/i);
    expect(body).toContain("Allow: /");
    expect(body).toContain("sitemap.xml");
  });

  test("sitemap.xml returns valid XML sitemap", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/blog");
  });

  test("homepage contains required metadata and canonical link", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Portfolio of Atul/i);

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();
    expect(description?.length).toBeGreaterThan(20);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
  });
});
