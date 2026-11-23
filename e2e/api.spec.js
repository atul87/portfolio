const { test, expect } = require("@playwright/test");

test.describe("API Health & Security Suite", () => {
    test("public core pages and data API respond with 200 OK", async ({ request }) => {
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
    });

    test("POST-only endpoints reject GET requests with 405 Method Not Allowed", async ({ request }) => {
        const googleGet = await request.get("/api/google");
        expect(googleGet.status()).toBe(405);

        const contactGet = await request.get("/api/contact");
        expect(contactGet.status()).toBe(405);
    });

    test("reCAPTCHA validation endpoint validates JSON payload and token", async ({ request }) => {
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
    });

    test("contact API validates email format and required fields", async ({ request }) => {
        // Invalid email format test
        const contactPost = await request.post("/api/contact", {
            headers: { "x-forwarded-for": "10.0.1.1" },
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
            headers: { "x-forwarded-for": "10.0.1.2" },
            data: {
                name: "E2E Test",
            },
        });
        expect(missingFieldsPost.status()).toBe(400);
        const missingFieldsJson = await missingFieldsPost.json();
        expect(missingFieldsJson.message).toBe("Name, email, and message are required.");
    });

    test("contact API rejects malformed JSON payloads", async ({ request }) => {
        const malformedPost = await request.post("/api/contact", {
            headers: {
                "Content-Type": "application/json",
                "x-forwarded-for": "10.0.1.3",
            },
            data: "invalid-json{",
        });
        expect(malformedPost.status()).toBe(400);
        const malformedJson = await malformedPost.json();
        expect(malformedJson.message).toBe("Invalid JSON payload.");
    });

    test("contact API honeypot traps spam bot submissions silently with 200", async ({ request }) => {
        const honeypotPost = await request.post("/api/contact", {
            headers: { "x-forwarded-for": "10.0.1.4" },
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
    });

    test("contact API enforces IP rate limiting (429 Too Many Requests)", async ({ request }) => {
        const rateLimitIp = "10.0.9.99";
        for (let i = 0; i < 5; i++) {
            await request.post("/api/contact", {
                headers: { "x-forwarded-for": rateLimitIp },
                data: { website: "honeypot" },
            });
        }
        const rateLimitedRes = await request.post("/api/contact", {
            headers: { "x-forwarded-for": rateLimitIp },
            data: { website: "honeypot" },
        });
        expect(rateLimitedRes.status()).toBe(429);
        const rateLimitedJson = await rateLimitedRes.json();
        expect(rateLimitedJson.message).toBe("Too many requests. Try later.");
    });

    test("HTTP response headers include required security hardening headers", async ({ request }) => {
        const rootRes = await request.get("/");
        const headers = rootRes.headers();
        expect(headers["x-frame-options"]).toBe("DENY");
        expect(headers["x-content-type-options"]).toBe("nosniff");
        expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    });
});
