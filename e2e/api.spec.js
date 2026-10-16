const { test, expect } = require("@playwright/test");

test("api endpoints respond with expected status", async ({ request }) => {
    const rootRes = await request.get("/");
    expect(rootRes.status()).toBe(200);

    const blogRes = await request.get("/blog");
    expect(blogRes.status()).toBe(200);

    const articleRes = await request.get("/blog/competitive-programming-lessons-tcs-codevita");
    expect(articleRes.status()).toBe(200);
    await expect(articleRes).toBeOK();

    const dataRes = await request.get("/api/data");
    expect(dataRes.status()).toBe(200);
    const dataJson = await dataRes.json();
    expect(dataJson.success).toBe(true);
    expect(dataJson.data.service).toBe("portfolio");

    // Method not allowed checks
    const googleGet = await request.get("/api/google");
    expect(googleGet.status()).toBe(405);

    const contactGet = await request.get("/api/contact");
    expect(contactGet.status()).toBe(405);

    // Google route validation tests
    const googleInvalidJson = await request.post("/api/google", {
        headers: { "Content-Type": "application/json" },
        data: "not-json{",
    });
    expect(googleInvalidJson.status()).toBe(400);
    const googleInvalidJsonBody = await googleInvalidJson.json();
    expect(googleInvalidJsonBody.error).toBe("Invalid JSON payload.");

    const googleMissingToken = await request.post("/api/google", {
        data: { someOtherField: "test" },
    });
    expect(googleMissingToken.status()).toBe(400);
    const googleMissingTokenBody = await googleMissingToken.json();
    expect(googleMissingTokenBody.error).toBe("Captcha token is required.");

    // Contact route input validation
    const contactPost = await request.post("/api/contact", {
        data: {
            name: "E2E Test",
            email: "invalid-email",
            message: "Hello from automated test",
        },
    });
    expect(contactPost.status()).toBe(400);
    const postJson = await contactPost.json();
    expect(postJson.success).toBe(false);
    expect(postJson.message).toBe("Please provide a valid email address.");

    // Missing field test
    const missingFieldsPost = await request.post("/api/contact", {
        data: {
            name: "E2E Test",
        },
    });
    expect(missingFieldsPost.status()).toBe(400);
    const missingFieldsJson = await missingFieldsPost.json();
    expect(missingFieldsJson.message).toBe("Name, email, and message are required.");

    // Malformed JSON payload test
    const malformedPost = await request.post("/api/contact", {
        headers: { "Content-Type": "application/json" },
        data: "invalid-json{",
    });
    expect(malformedPost.status()).toBe(400);
    const malformedJson = await malformedPost.json();
    expect(malformedJson.message).toBe("Invalid JSON payload.");

    // Honeypot test: bots filling hidden 'website' field should be silently accepted with 200
    const honeypotPost = await request.post("/api/contact", {
        data: {
            name: "Spam Bot",
            email: "bot@spamdomain.com",
            message: "Buy cheap backlinks now",
            website: "https://spam.com",
        },
    });
    expect(honeypotPost.status()).toBe(200);
    const honeypotJson = await honeypotPost.json();
    expect(honeypotJson.success).toBe(true);
    expect(honeypotJson.message).toBe("Message sent successfully!");

    // Security Headers check on production responses
    const headers = rootRes.headers();
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});

