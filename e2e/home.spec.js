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
    await expect(hobbiesSection.getByText("Traveling")).toBeVisible();

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

test("experience section displays Hindustan press coverage card and opens reading modal", async ({ page }) => {
    await page.goto("/#experience");

    const experienceSection = page.locator("#experience");
    await expect(experienceSection).toBeVisible();

    // Verify press coverage card
    await expect(experienceSection.getByText("National Press Coverage")).toBeVisible();
    await expect(experienceSection.getByText("Hindustan Daily (हिन्दुस्तान)")).toBeVisible();
    await expect(experienceSection.getByRole("img", { name: /Hindustan Newspaper Coverage/i })).toBeVisible();

    // Click "Enlarge Clipping" button
    const enlargeBtn = experienceSection.getByRole("button", { name: /Enlarge Clipping/i });
    await expect(enlargeBtn).toBeVisible();
    await enlargeBtn.click();

    // Verify reading modal dialog
    const modal = page.getByRole("dialog", { name: /Hindustan Newspaper Coverage/i });
    await expect(modal).toBeVisible();
    await expect(modal.getByText("एलेनहाउस के डिफेंस से जुड़े तीन शोधपत्र प्रकाशित होंगे")).toBeVisible();
    await expect(modal.getByRole("link", { name: /View Official IEEE Publication/i })).toBeVisible();

    // Close on Escape key
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
});

test("education section displays Kanpur Google Maps iframe card with address details and actions", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/#education");

    const educationSection = page.locator("#education");
    await expect(educationSection).toBeVisible();

    // Verify map card header and address text
    await expect(educationSection.getByText("Location & Native Base")).toBeVisible();
    await expect(educationSection.getByText("1735/02, Awas Vikas, Hanspuram")).toBeVisible();
    await expect(educationSection.getByText(/Naubasta, Kanpur, Uttar Pradesh/)).toBeVisible();

    // Verify Google Maps iframe
    const mapIframe = educationSection.locator("iframe");
    await expect(mapIframe).toBeVisible();
    await expect(mapIframe).toHaveAttribute("src", /maps\.google\.com\/maps\?q=1735%2F02/);

    // Verify copy button feedback
    const copyBtn = educationSection.getByRole("button", { name: /Copy/i });
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(educationSection.getByText("Copied!")).toBeVisible();

    // Verify external links
    const openMapsLink = educationSection.getByRole("link", { name: /Open in Maps/i });
    await expect(openMapsLink).toBeVisible();
    await expect(openMapsLink).toHaveAttribute("href", /google\.com\/maps\/search/);

    const directionsLink = educationSection.getByRole("link", { name: /Get Directions/i });
    await expect(directionsLink).toBeVisible();
    await expect(directionsLink).toHaveAttribute("href", /google\.com\/maps\/dir/);

    // Verify updated student-status badge
    await expect(educationSection.getByText(/Final-Year B\.Tech CSE/)).toBeVisible();
});

test("hero section renders updated coder skills and about me bio", async ({ page }) => {
    await page.goto("/");

    // Verify About Me text
    const aboutSection = page.locator("#about");
    await expect(aboutSection.getByText(/Final-year B\.Tech Computer Science student graduating in 2027/)).toBeVisible();

    // Verify Hero terminal coder stack
    await expect(page.locator("code").filter({ hasText: "coder" }).first()).toBeVisible();
    await expect(page.getByText("Multi-Agent Systems")).toBeVisible();
    await expect(page.getByText("Generative AI").first()).toBeVisible();
    await expect(page.getByText("FastAPI")).toBeVisible();
    await expect(page.getByText("RAG", { exact: true })).toBeVisible();
    await expect(page.getByText("XGBoost").first()).toBeVisible();

    // Verify FORESIGHT project card tools and syntax quotes
    const projectCard = page.locator("#projects");
    await expect(projectCard.getByText("project_1.ts")).toBeVisible();
    await expect(projectCard.getByText("Time-Series", { exact: true })).toBeVisible();
    await expect(projectCard.getByText("Scikit-learn").first()).toBeVisible();
    await expect(projectCard.getByText("'],").first()).toBeVisible();
});

test("home page renders What I Value section and HackerRank Achievements card", async ({ page }) => {
    await page.goto("/");

    // Verify What I Value section
    const valuesSection = page.locator("#values");
    await expect(valuesSection).toBeVisible();
    await expect(valuesSection.getByRole("heading", { name: "What I Value" })).toBeVisible();
    await expect(valuesSection.getByText("The principles that guide my work and professional relationships.")).toBeVisible();
    await expect(valuesSection.getByText("Clean Code", { exact: true })).toBeVisible();
    await expect(valuesSection.getByText("Innovation", { exact: true })).toBeVisible();
    await expect(valuesSection.getByText("Collaboration", { exact: true })).toBeVisible();
    await expect(valuesSection.getByText("Impact", { exact: true })).toBeVisible();

    // Verify HackerRank Achievements card
    const hackerRankCard = page.locator("#hackerrank-achievements");
    await expect(hackerRankCard).toBeVisible();
    await expect(hackerRankCard.getByText("HackerRank Achievements")).toBeVisible();
    await expect(hackerRankCard.getByText("Competitive programming and coding proficiency")).toBeVisible();
    await expect(hackerRankCard.getByText("Python", { exact: true })).toBeVisible();
    await expect(hackerRankCard.getByText("5 / 5")).toBeVisible();
    await expect(hackerRankCard.getByText("Gold", { exact: true })).toBeVisible();
    await expect(hackerRankCard.getByText("Problem Solving", { exact: true })).toBeVisible();
    await expect(hackerRankCard.getByText("4 / 5")).toBeVisible();
    await expect(hackerRankCard.getByText("Silver", { exact: true })).toBeVisible();

    // Verify outbound link
    const hrLink = hackerRankCard.getByRole("link", { name: /View HackerRank Profile/i });
    await expect(hrLink).toBeVisible();
    await expect(hrLink).toHaveAttribute("href", /hackerrank\.com\/profile\/atulverma15704/);
});



