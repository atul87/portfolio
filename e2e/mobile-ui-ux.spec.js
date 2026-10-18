const { test, expect } = require("@playwright/test");

test.describe("Mobile & Multi-Device UI/UX Suite", () => {
  const mobileViewports = [
    { name: "iPhone SE / Small Mobile", width: 375, height: 667 },
    { name: "iPhone 13 / Modern Mobile", width: 390, height: 844 },
    { name: "Android Large Viewport", width: 412, height: 915 },
    { name: "iPad / Tablet Portrait", width: 768, height: 1024 },
  ];

  for (const vp of mobileViewports) {
    test(`homepage has no horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");

      // Check if document has horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(overflow, `Horizontal overflow detected on ${vp.name}!`).toBe(false);
    });

    test(`gallery page has no horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/gallery");

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(overflow, `Horizontal overflow detected in gallery on ${vp.name}!`).toBe(false);
    });

    test(`blog page has no horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/blog");

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(overflow, `Horizontal overflow detected in blog on ${vp.name}!`).toBe(false);
    });
  }

  test("mobile navigation drawer opens, displays links, and closes smoothly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const menuBtn = page.getByLabel("Open navigation menu");
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Verify nav links inside mobile drawer
    const aboutLink = page.getByRole("link", { name: "ABOUT" });
    await expect(aboutLink).toBeVisible();
    const expLink = page.getByRole("link", { name: "EXPERIENCE" });
    await expect(expLink).toBeVisible();
    const skillsLink = page.getByRole("link", { name: "SKILLS" });
    await expect(skillsLink).toBeVisible();
    const projectsLink = page.getByRole("link", { name: "PROJECTS" });
    await expect(projectsLink).toBeVisible();

    // Press Escape to dismiss drawer
    await page.keyboard.press("Escape");
    await expect(menuBtn).toBeVisible();
  });

  test("interactive modals fit viewport and remain accessible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Open Press Coverage Modal in Experience section
    const enlargeBtn = page.locator("#experience").getByRole("button", { name: /Enlarge Clipping/i });
    await expect(enlargeBtn).toBeVisible();
    await enlargeBtn.click();

    const pressModal = page.getByRole("dialog", { name: /Hindustan Newspaper Coverage/i });
    await expect(pressModal).toBeVisible();

    // Verify close button is within viewport bounds and clickable
    const closeBtn = pressModal.getByRole("button", { name: /Close dialog/i });
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(pressModal).not.toBeVisible();
  });

  test("chatbot launcher and dialog operate smoothly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Chatbot launcher should be accessible on mobile
    const chatBtn = page.getByRole("button", { name: "Open portfolio chat" });
    await expect(chatBtn).toBeVisible();
    await chatBtn.click();

    // Dialog opens
    const chatDialog = page.getByRole("dialog", { name: "Atul's portfolio assistant" });
    await expect(chatDialog).toBeVisible();

    // Verify input box and close button on mobile
    const input = chatDialog.getByRole("textbox", { name: "Your message" });
    await expect(input).toBeVisible();

    const closeBtn = chatDialog.getByRole("button", { name: "Close chat" });
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(chatDialog).not.toBeVisible();
  });

  test("touch targets have adequate dimensions for mobile ergonomics", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Check key action buttons have at least 32px height for mobile tapping
    const actionButtons = [
      page.getByRole("button", { name: /Get Resume/i }),
      page.getByRole("link", { name: /Contact me/i }),
    ];

    for (const btn of actionButtons) {
      await expect(btn).toBeVisible();
      const box = await btn.boundingBox();
      expect(box, "Button bounding box must exist").not.toBeNull();
      expect(box.height, "Button must have adequate touch height").toBeGreaterThanOrEqual(32);
    }
  });
});
