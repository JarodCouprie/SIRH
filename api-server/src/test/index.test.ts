import request from "supertest";
import app from "../index";

describe("Sanity test", () => {
  test("1 should equal 1", () => {
    expect(1).toBe(1);
  });
});

describe("Test endpoint /api/demand", () => {
  test("should return demand list", async () => {
    const res = await request(app).get("/api/demand/");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
});
