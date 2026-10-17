const { test, expect } = require("@playwright/test");

test.describe("Portfolio Chatbot (Ask Atul AI)", () => {
    test("launcher button is visible and opens/closes the chat dialog", async ({ page }) => {
        await page.goto("/");

        const launcher = page.getByRole("button", { name: "Open portfolio chat" });
        await expect(launcher).toBeVisible();
        await expect(launcher).toContainText("Ask AI");

        // Click launcher to open
        await launcher.click();

        const dialog = page.getByRole("dialog", { name: "Atul's portfolio assistant" });
        await expect(dialog).toBeVisible();
        await expect(dialog.getByText("Atul's AI Assistant", { exact: true })).toBeVisible();
        await expect(dialog.getByText(/Portfolio • Gemini AI/)).toBeVisible();

        // Click close button
        const closeBtn = page.getByRole("button", { name: "Close chat" });
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();

        await expect(dialog).not.toBeVisible();
    });

    test("chat dialog closes when Escape key is pressed", async ({ page }) => {
        await page.goto("/");

        const launcher = page.getByRole("button", { name: "Open portfolio chat" });
        await launcher.click();

        const dialog = page.getByRole("dialog", { name: "Atul's portfolio assistant" });
        await expect(dialog).toBeVisible();

        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeVisible();
    });

    test("launcher is available across all major portfolio routes", async ({ page }) => {
        for (const path of ["/", "/blog", "/gallery"]) {
            await page.goto(path);
            const launcher = page.getByRole("button", { name: "Open portfolio chat" });
            await expect(launcher).toBeVisible();
        }
    });

    test("shows assistant reply when user sends a question", async ({ page }) => {
        // Mock the backend Gemini API route for deterministic testing
        await page.route("**/api/chat", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    reply: "FORESIGHT is Atul's AI demand forecasting project built with Prophet, XGBoost, and FastAPI.",
                }),
            });
        });

        await page.goto("/");

        const launcher = page.getByRole("button", { name: "Open portfolio chat" });
        await launcher.click();

        const dialog = page.getByRole("dialog", { name: "Atul's portfolio assistant" });
        await expect(dialog).toBeVisible();

        const input = dialog.getByPlaceholder(/Ask about Atul's work/);
        await expect(input).toBeVisible();
        await input.fill("Tell me about FORESIGHT");

        const sendBtn = dialog.locator("form button[type='submit']");
        await sendBtn.click();

        // Verify user message appears in chat
        await expect(dialog.getByText("Tell me about FORESIGHT")).toBeVisible();

        // Verify mocked assistant response appears in chat
        await expect(
            dialog.getByText(/FORESIGHT is Atul's AI demand forecasting project/)
        ).toBeVisible();
    });

    test("clicking a suggestion pill sends it as a prompt", async ({ page }) => {
        await page.route("**/api/chat", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    reply: "Atul specializes in Agentic AI, PyTorch, TensorFlow, and full-stack web applications.",
                }),
            });
        });

        await page.goto("/");
        await page.getByRole("button", { name: "Open portfolio chat" }).click();

        const skillPill = page.getByRole("button", { name: "What are your AI/ML skills?" });
        await expect(skillPill).toBeVisible();
        await skillPill.click();

        await expect(
            page.getByText(/Atul specializes in Agentic AI, PyTorch/)
        ).toBeVisible();
    });

    test("backend chat API validates input schemas properly", async ({ request }) => {
        // Invalid non-JSON payload returns 400
        const resInvalidJson = await request.post("/api/chat", {
            data: "{bad_json",
            headers: { "Content-Type": "application/json" },
        });
        expect(resInvalidJson.status()).toBe(400);

        // Missing messages array returns 400
        const resEmptyObj = await request.post("/api/chat", {
            data: {},
            headers: { "Content-Type": "application/json" },
        });
        expect(resEmptyObj.status()).toBe(400);

        // Empty messages array returns 400
        const resEmptyMessages = await request.post("/api/chat", {
            data: { messages: [] },
            headers: { "Content-Type": "application/json" },
        });
        expect(resEmptyMessages.status()).toBe(400);

        // Excessively long message (> 1500 chars) returns 400
        const longText = "a".repeat(1501);
        const resTooLong = await request.post("/api/chat", {
            data: { messages: [{ role: "user", content: longText }] },
            headers: { "Content-Type": "application/json" },
        });
        expect(resTooLong.status()).toBe(400);
    });
});
