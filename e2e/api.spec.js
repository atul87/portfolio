const { test, expect } = require("@playwright/test");

test("api endpoints respond with expected status", async ({ request }) => {
    const rootRes = await request.get("/");
    expect(rootRes.status()).toBe(200);

    const blogRes = await request.get("/blog");
    expect(blogRes.status()).toBe(200);

    const dataRes = await request.get("/api/data");
    expect(dataRes.status()).toBe(200);
    const dataJson = await dataRes.json();
    expect(dataJson.success).toBe(true);

    const googleGet = await request.get("/api/google");
    expect(googleGet.status()).toBe(405);

    const contactGet = await request.get("/api/contact");
    expect(contactGet.status()).toBe(405);

    const contactPost = await request.post("/api/contact", {
        data: {
            name: "E2E Test",
            email: "test@example.com",
            message: "Hello from automated test",
        },
    });
    expect(contactPost.status()).toBe(400);
    const postJson = await contactPost.json();
    expect(postJson.success).toBe(false);
});
