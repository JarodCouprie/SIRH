import request from "supertest";
import app from "../index";

describe("Test endpoint /api/demand", () => {
  let server: any;
  let token: string;

  beforeAll((done) => {
    server = app.listen(5001, done);
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxOTkwNDQ0NCwiZXhwIjoxNzE5OTA1MzQ0fQ.pZwdnZ1y_z8Vzcye5l2ch7O4UG4bLp90BV9xInLjFuE";
  });

  afterAll(async () => {
    server.close();
  });

  test("should return demand list", async () => {
    const res = await request(server)
      .get("/api/demand/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test("should return demand details", async () => {
    const res = await request(server)
      .get("/api/demand/45")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test("should create demand", async () => {
    const demandData = {
      startDate: "2024-05-22",
      endDate: "2024-05-24",
      motivation: "pitié",
      status: "DENIED",
      type: "CA",
      number_day: "1",
      idOwner: "1",
    };
    const res = await request(server)
      .post("/api/demand/")
      .set("Authorization", `Bearer ${token}`)
      .send(demandData);
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
  });

  test("should modify demand", async () => {
    const demandData = {
      startDate: "2024-05-22",
      endDate: "2024-05-26",
      motivation: "TEST MODIFICATION",
      status: "DRAFT",
      type: "CA",
      number_day: "1",
      idOwner: "1",
    };
    const res = await request(server)
      .put("/api/demand/58")
      .set("Authorization", `Bearer ${token}`)
      .send(demandData);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test("should delete demand", async () => {
    const res = await request(server)
      .delete("/api/demand/53")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
});
