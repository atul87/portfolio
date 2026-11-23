const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const CORE_A11Y_RULES = [
  "aria-allowed-attr",
  "aria-hidden-focus",
  "aria-required-attr",
  "aria-required-children",
  "aria-required-parent",
  "aria-roles",
  "aria-valid-attr-value",
  "aria-valid-attr",
  "button-name",
  "duplicate-id",
  "image-alt",
  "input-button-name",
  "landmark-no-duplicate-banner",
  "landmark-no-duplicate-contentinfo",
  "landmark-no-duplicate-main",
  "valid-lang",
];

test.describe("Automated Accessibility (a11y) Audits", () => {
  test("homepage adheres to core ARIA and accessibility rules", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withRules(CORE_A11Y_RULES)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("blog page adheres to core ARIA and accessibility rules", async ({ page }) => {
    await page.goto("/blog");
    const results = await new AxeBuilder({ page })
      .withRules(CORE_A11Y_RULES)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("gallery page adheres to core ARIA and accessibility rules", async ({ page }) => {
    await page.goto("/gallery");
    const results = await new AxeBuilder({ page })
      .withRules(CORE_A11Y_RULES)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("chatbot dialog meets full WCAG accessibility rules including color-contrast", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open portfolio chat" }).click();
    await expect(page.getByRole("dialog", { name: "Atul's portfolio assistant" })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('section[role="dialog"]')
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
