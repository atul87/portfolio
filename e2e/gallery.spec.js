const { test, expect } = require("@playwright/test");

test.describe("Gallery & Visual Log Suite", () => {
    test("gallery page renders header, category pills, and responsive items", async ({ page }) => {
        await page.goto("/gallery");

        // Verify Header elements
        await expect(page.getByText("(GALLERY)")).toBeVisible();
        await expect(page.getByRole("heading", { name: "Visual log" })).toBeVisible();
        await expect(page.getByText("Hackathons, research work and club events — grouped by occasion.")).toBeVisible();

        // Verify Category Pills
        const allEventsBtn = page.getByRole("button", { name: /ALL EVENTS/ });
        await expect(allEventsBtn).toBeVisible();
        const certsBtn = page.getByRole("button", { name: /CERTIFICATIONS/ });
        await expect(certsBtn).toBeVisible();
        const achievementsBtn = page.getByRole("button", { name: /ACHIEVEMENTS/ });
        await expect(achievementsBtn).toBeVisible();
        const hackathonsBtn = page.getByRole("button", { name: /HACKATHONS/ });
        await expect(hackathonsBtn).toBeVisible();
        const confBtn = page.getByRole("button", { name: /INTERNATIONAL CONFERENCE/ });
        await expect(confBtn).toBeVisible();

        // Check initial records count (23 total records)
        await expect(page.getByText(/Showing 23 of 23 records/)).toBeVisible();

        // Filter by CERTIFICATIONS (10 items)
        await certsBtn.click();
        await expect(page.getByText("Oracle Certified Foundations Associate — Agentic AI")).toBeVisible();
        await expect(page.getByText("Kaggle — Python Certificate of Completion")).toBeVisible();
        await expect(page.getByText(/Showing 10 of 23 records/)).toBeVisible();

        // Filter by ACHIEVEMENTS (2 items)
        await achievementsBtn.click();
        await expect(page.getByText("TCS CodeVita Season XIII — Global Rank 7007")).toBeVisible();
        await expect(page.getByText("Naukri Campus Young Turks '26 — 99.67 Percentile Merit")).toBeVisible();
        await expect(page.getByText(/Showing 2 of 23 records/)).toBeVisible();

        // Filter by HACKATHONS (2 items)
        await hackathonsBtn.click();
        await expect(page.getByText("Axis HackSprint National Level Hackathon")).toBeVisible();
        await expect(page.getByText(/Showing 2 of 23 records/)).toBeVisible();

        // Filter by INTERNATIONAL CONFERENCE (2 unique events)
        await confBtn.click();
        await expect(page.getByText("IEEE ISCS 2025 — Federated Generative Intelligence")).toBeVisible();
        await expect(page.getByText("IEEE SCEECS 2026 — Agentic AI Framework")).toBeVisible();

        // Restore ALL EVENTS
        await allEventsBtn.click();
        await expect(page.getByText(/Showing 23 of 23 records/)).toBeVisible();
    });

    test("gallery item opens details lightbox modal and closes on Escape", async ({ page }) => {
        await page.goto("/gallery");

        // Click first item to open modal
        const firstCard = page.getByText("Oracle Certified Foundations Associate — Agentic AI").first();
        await firstCard.click();

        // Verify modal dialog
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await expect(dialog.getByText("Venue: Oracle University")).toBeVisible();

        // Press Escape to close modal
        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeVisible();
    });

    test("homepage displays gallery section and links to /gallery", async ({ page }) => {
        await page.goto("/");

        const gallerySection = page.locator("#gallery");
        await expect(gallerySection).toBeVisible();
        await expect(gallerySection.getByText("Visual Log & Glimpses")).toBeVisible();

        // Click "Explore All Events" button
        const exploreBtn = gallerySection.getByRole("link", { name: /Explore All Events/ });
        await expect(exploreBtn).toBeVisible();
        await exploreBtn.click();

        await expect(page).toHaveURL("/gallery");
        await expect(page.getByRole("heading", { name: "Visual log" })).toBeVisible();
    });

    test("gallery static assets respond with 200 OK", async ({ request }) => {
        const testImages = [
            "/gallery/certificates/oracle-agentic-ai.jpg",
            "/gallery/achievements/tcs-codevita-season13.jpg",
            "/gallery/achievements/young-turks-2026.jpg",
            "/gallery/certificates/zidio-internship.jpg",
            "/gallery/certificates/apna-college-aiml.jpg",
            "/gallery/certificates/linkedin-generative-ai.jpg",
            "/gallery/certificates/kaggle-python.png",
            "/gallery/certificates/infosys-javascript.jpg",
            "/gallery/certificates/infosys-css3.jpg",
            "/gallery/certificates/infosys-html5.jpg",
            "/gallery/certificates/coding-ninjas-machine-learning.jpg",
            "/gallery/certificates/coding-ninjas-dsa-python.jpg",
            "/gallery/certificates/coding-ninjas-oops-python.jpg",
            "/gallery/hackathons/axis-hacksprint-hackathon.jpeg",
            "/gallery/hackathons/sih-smart-india-hackathon.jpeg",
            "/gallery/research/ieee-iscs-2025-presentation.jpg",
            "/gallery/iit/iit-ai-workshop.jpeg",
        ];

        for (const imgUrl of testImages) {
            const res = await request.get(imgUrl);
            expect(res.status()).toBe(200);
        }
    });

    test("every gallery item has a strictly unique image (1 image for 1 event, 0 duplicates)", async ({ page }) => {
        await page.goto("/gallery");

        // Collect all card image src attributes
        const cardImages = await page.locator("div.grid img").evaluateAll((imgs) =>
            imgs.map((img) => img.getAttribute("src"))
        );

        expect(cardImages.length).toBe(23);
        const uniqueSrcs = new Set(cardImages);
        // Expect exact 1-to-1 match: every image is completely unique!
        expect(uniqueSrcs.size).toBe(23);
    });
});
