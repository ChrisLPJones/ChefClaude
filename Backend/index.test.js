const request = require("supertest");
const app = require("./index"); // your Express app
let server;

beforeAll(() => {
  server = app.listen(4000); // start test server
});

afterAll((done) => {
  server.close(done); // stop server cleanly
});

describe("POST /api/claude/validingredient", () => {
  it("should return valid: true for a real ingredient", async () => {
    const res = await request(server)
      .post("/api/claude/validingredient")
      .send({ ingredient: "chicken" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("valid");
  });

  it("should return valid: false for nonsense", async () => {
    const res = await request(server)
      .post("/api/claude/validingredient")
      .send({ ingredient: "asldkfjasldkfj" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("valid");
  });
});

describe("POST /api/claude", () => {
  it("should return 400 for invalid input", async () => {
    const res = await request(server)
      .post("/api/claude")
      .send({ ingredients: "not an array" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should return recipe for valid ingredients", async () => {
    if (!process.env.API_KEY) return;

    const res = await request(server)
      .post("/api/claude")
      .send({ ingredients: ["chicken", "rice"] });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("content");
  });
});
