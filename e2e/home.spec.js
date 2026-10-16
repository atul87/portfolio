const { test, expect } = require("@playwright/test");

test("home page renders key sections and stats", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("nav").getByRole("link", { name: "Atul" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact me" })).toBeVisible();
    await expect(page.getByRole("link", { name: "ABOUT" })).toBeVisible();
    await expect(page.getByRole("link", { name: "EXPERIENCE" })).toBeVisible();
    await expect(page.getByRole("link", { name: "SKILLS" })).toBeVisible();
    await expect(page.getByRole("link", { name: "PROJECTS" })).toBeVisible();

    // Verify Stats Section
    await expect(page.getByText("Public Repositories")).toBeVisible();
    await expect(page.getByText("IEEE Research Paper")).toBeVisible();
    await expect(page.getByText("DSA Problems Solved")).toBeVisible();

    // Verify Contact Section
    await expect(page.locator("#contact")).toBeVisible();
});

test("project category filters update project cards", async ({ page }) => {
    await page.goto("/");

    // Click "AI & ML" filter
    const aiFilterBtn = page.getByRole("button", { name: "AI & ML" });
    await expect(aiFilterBtn).toBeVisible();
    await aiFilterBtn.click();

    // Verify AI/ML project card is shown
    await expect(page.getByText("Crop Recommendation System").first()).toBeVisible();

    // Click "Full-Stack" filter
    const fullStackBtn = page.getByRole("button", { name: "Full-Stack" });
    await fullStackBtn.click();
    await expect(page.getByText("Flavour Fleet - Premium Food Delivery Platform").first()).toBeVisible();
});

test("contact form validates input fields client-side", async ({ page }) => {
    await page.goto("/");

    // Attempt to submit empty form
    const sendBtn = page.getByRole("button", { name: "Send Message" });
    await sendBtn.click();
    await expect(page.getByText("Please complete all fields.")).toBeVisible();

    // Fill invalid email and check email error
    const nameInput = page.locator('input[type="text"]');
    const emailInput = page.locator('input[type="email"]');
    await nameInput.fill("Test Recruiter");
    await emailInput.fill("invalid-email-format");
    await emailInput.blur();
    await expect(page.getByText("Please provide a valid email.")).toBeVisible();
});

test("404 page renders and navigates back home", async ({ page }) => {
    await page.goto("/non-existent-page");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Page Not Found")).toBeVisible();

    const homeBtn = page.getByRole("button", { name: "Go to Home" });
    await homeBtn.click();
    await expect(page).toHaveURL("/");
});
