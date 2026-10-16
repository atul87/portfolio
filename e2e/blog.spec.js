const { test, expect } = require("@playwright/test");

test("blog page lists local articles, supports search/filtering, and opens reader page", async ({ page }) => {
  await page.goto("/blog");

  // Check page heading
  await expect(page.getByText("All Blogs")).toBeVisible();

  // Verify the new Federated Learning article and other articles are listed
  const flArticle = page.getByRole("link", {
    name: "Federated Learning for Cyber Defence: Privacy-Preserving Threat Detection",
  });
  await expect(flArticle).toBeVisible();

  const civicArticle = page.getByRole("link", {
    name: "Civic Tech Beyond Code: Building Around Everyday Problems",
  });
  await expect(civicArticle).toBeVisible();

  // Test live search
  const searchInput = page.getByLabel("Search articles");
  await expect(searchInput).toBeVisible();
  await searchInput.fill("Federated");
  await expect(flArticle).toBeVisible();
  await expect(civicArticle).not.toBeVisible();

  // Clear search
  await searchInput.fill("");
  await expect(civicArticle).toBeVisible();

  // Click article to open reader
  await civicArticle.click();
  await expect(page).toHaveURL("/blog/civic-tech-beyond-code-civicconnect");
  await expect(
    page.getByRole("heading", { name: "Civic Tech Beyond Code: Building Around Everyday Problems" })
  ).toBeVisible();

  // Check author attribution and next article navigation
  await expect(page.getByText("By Atul", { exact: true })).toBeVisible();
  await expect(page.getByText("Atul Verma")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Adjacent Articles" })).toBeVisible();
});
