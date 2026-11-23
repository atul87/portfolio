const { test, expect } = require("@playwright/test");

test.describe("Blog & Article Reader Suite", () => {
  test("blog index lists published articles and renders metadata", async ({ page }) => {
    await page.goto("/blog");

    // Check page heading
    await expect(page.getByText("All Blogs")).toBeVisible();

    // Verify key articles are listed
    const flArticle = page.getByRole("link", {
      name: "Federated Learning for Cyber Defence: Privacy-Preserving Threat Detection",
    });
    await expect(flArticle).toBeVisible();

    const civicArticle = page.getByRole("link", {
      name: "Civic Tech Beyond Code: Building Around Everyday Problems",
    });
    await expect(civicArticle).toBeVisible();
  });

  test("live search filters articles dynamically and restores list when cleared", async ({ page }) => {
    await page.goto("/blog");

    const flArticle = page.getByRole("link", {
      name: "Federated Learning for Cyber Defence: Privacy-Preserving Threat Detection",
    });
    const civicArticle = page.getByRole("link", {
      name: "Civic Tech Beyond Code: Building Around Everyday Problems",
    });

    const searchInput = page.getByLabel("Search articles");
    await expect(searchInput).toBeVisible();

    // Filter by 'Federated'
    await searchInput.fill("Federated");
    await expect(flArticle).toBeVisible();
    await expect(civicArticle).not.toBeVisible();

    // Clear search and ensure all articles reappear
    await searchInput.fill("");
    await expect(civicArticle).toBeVisible();
    await expect(flArticle).toBeVisible();
  });

  test("clicking an article navigates to reader page with author info and adjacent navigation", async ({ page }) => {
    await page.goto("/blog");

    const civicArticle = page.getByRole("link", {
      name: "Civic Tech Beyond Code: Building Around Everyday Problems",
    });
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

  test("accessing a non-existent blog slug returns 404 page", async ({ page }) => {
    await page.goto("/blog/non-existent-blog-slug-404");

    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(page.getByText("Page Not Found")).toBeVisible();
    const homeBtn = page.getByRole("link", { name: "Go to Home" });
    await expect(homeBtn).toBeVisible();
  });

  test("all 5 local blog articles render successfully with complete body content", async ({ page }) => {
    const slugs = [
      "federated-learning-cyber-defence",
      "civic-tech-beyond-code-civicconnect",
      "concept-to-clarity-180-seconds",
      "competitive-programming-lessons-tcs-codevita",
      "mathematics-logic-foundations-computer-science",
    ];

    for (const slug of slugs) {
      await page.goto(`/blog/${slug}`);
      const articleHeading = page.getByRole("heading", { level: 1 });
      await expect(articleHeading).toBeVisible();
      const content = page.locator("article");
      await expect(content).toBeVisible();
      await expect(content.locator("p").first()).toBeVisible();
    }
  });
});
