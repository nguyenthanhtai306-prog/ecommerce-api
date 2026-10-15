const request = require("supertest");
const app = require("../app");

describe("Products API", () => {
    test("GET /api/products trả về danh sách sản phẩm", async() => {
        const response = await request(app).get("/api/products");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("products");
        expect(Array.isArray(response.body.products)).toBe(true);

    });
});