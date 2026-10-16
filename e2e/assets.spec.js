const { test, expect } = require("@playwright/test");

test.describe("Static Assets Verification", () => {
  test("essential public assets respond with 200", async ({ request }) => {
    const assets = [
      "/profile.png",
      "/hero.svg",
      "/section.svg",
      "/blur-23.svg",
      "/resume.pdf",
      "/skills/default.svg"
    ];

    for (const asset of assets) {
      const res = await request.get(asset);
      expect(res.status(), `Asset ${asset} should return 200`).toBe(200);
    }
  });

  test("resume PDF has valid PDF header", async ({ request }) => {
    const res = await request.get("/resume.pdf");
    expect(res.status()).toBe(200);
    const buffer = await res.body();
    const header = buffer.subarray(0, 5).toString("utf-8");
    expect(header).toBe("%PDF-");
  });
});
