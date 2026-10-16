const { test, expect } = require("@playwright/test");

test("blog page lists local articles and opens an article page", async ({ page }) => {
    await page.goto("/blog");

    await expect(page.getByText("All Blogs")).toBeVisible();
    const article = page.getByRole("link", { name: "Civic Tech Beyond Code: Building Around Everyday Problems" });
    await expect(article).toBeVisible();
    await article.click();
    await expect(page).toHaveURL("/blog/civic-tech-beyond-code-civicconnect");
    await expect(page.getByRole("heading", { name: "Civic Tech Beyond Code: Building Around Everyday Problems" })).toBeVisible();
});
