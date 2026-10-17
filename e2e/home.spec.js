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

    // Verify Research Section
    await expect(page.locator("#research")).toBeVisible();
    await expect(page.getByText("Research & Publications")).toBeVisible();
    await expect(page.getByText("Federated Generative Intelligence").first()).toBeVisible();

    // Verify Soft Skills Section
    const softSkillsSection = page.locator("#soft-skills");
    await expect(softSkillsSection).toBeVisible();
    await expect(softSkillsSection.getByRole("heading", { name: "Soft Skills" })).toBeVisible();
    await expect(softSkillsSection.getByText("Leadership", { exact: true })).toBeVisible();
    await expect(softSkillsSection.getByText("Team Collaboration", { exact: true })).toBeVisible();
    await expect(softSkillsSection.getByText("Public Speaking", { exact: true })).toBeVisible();
    await expect(softSkillsSection.getByText("Problem-Solving", { exact: true })).toBeVisible();
    await expect(softSkillsSection.getByText("Time Management", { exact: true })).toBeVisible();
    await expect(softSkillsSection.getByText("Event Coordination", { exact: true })).toBeVisible();
    await expect(softSkillsSection.getByText("Critical Thinking", { exact: true })).toBeVisible();
    await expect(softSkillsSection.getByText("Adaptability", { exact: true })).toBeVisible();

    // Verify Hobbies Section
    const hobbiesSection = page.locator("#hobbies");
    await expect(hobbiesSection).toBeVisible();
    await expect(hobbiesSection.getByText("Hobbies", { exact: true })).toBeVisible();
    await expect(hobbiesSection.getByText("Browsing Technology")).toBeVisible();
    await expect(hobbiesSection.getByText("Current Affairs & News")).toBeVisible();
    await expect(hobbiesSection.getByText("Yoga")).toBeVisible();
    await expect(hobbiesSection.getByText("Reading Books")).toBeVisible();
    await expect(hobbiesSection.getByText("Problem Solving")).toBeVisible();

    // Verify Contact Section
    await expect(page.locator("#contact")).toBeVisible();
});

test("project category filters update project cards and counters", async ({ page }) => {
    await page.goto("/");

    const projectSection = page.locator("#projects");

    // Verify category buttons and counts
    await expect(projectSection.getByRole("button", { name: /^All/ })).toBeVisible();
    await expect(projectSection.getByRole("button", { name: /AI & ML/ })).toBeVisible();
    await expect(projectSection.getByRole("button", { name: /Full-Stack/ })).toBeVisible();
    await expect(projectSection.getByRole("button", { name: /Civic & PWA/ })).toBeVisible();

    // Initial state: Showing 10 of 10 projects
    await expect(page.getByText(/Showing 10 of 10 projects/)).toBeVisible();

    // Click "AI & ML" filter
    const aiFilterBtn = projectSection.getByRole("button", { name: /AI & ML/ });
    await aiFilterBtn.click();

    // Verify AI/ML project cards are shown and counter updates
    await expect(page.getByText("FORESIGHT").first()).toBeVisible();
    await expect(page.getByText("Crop Recommendation System").first()).toBeVisible();
    await expect(page.getByText(/Showing 7 of 10 projects/)).toBeVisible();

    // Click "Full-Stack" filter
    const fullStackBtn = projectSection.getByRole("button", { name: /Full-Stack/ });
    await fullStackBtn.click();
    await expect(page.getByText(/Flavour Fleet/).first()).toBeVisible();
    await expect(page.getByText(/Showing 5 of 10 projects/)).toBeVisible();

    // Click "All" filter to restore
    const allBtn = projectSection.getByRole("button", { name: /^All/ });
    await allBtn.click();
    await expect(page.getByText(/Showing 10 of 10 projects/)).toBeVisible();
});

test("project card copy button copies project details and shows feedback", async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");

    const copyBtn = page.getByRole("button", { name: "Copy project details" }).first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Check feedback state
    await expect(page.getByText("Copied!").first()).toBeVisible();
});

test("contact form validates input fields client-side", async ({ page }) => {
    await page.goto("/");

    // Attempt to submit empty form
    const sendBtn = page.getByRole("button", { name: "Send Message" });
    await sendBtn.click();
    await expect(page.getByText("Please complete all fields.")).toBeVisible();

    // Fill invalid email and check email error
    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
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
