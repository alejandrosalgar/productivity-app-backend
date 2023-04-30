const request = require("supertest");

const app = require("../app");

require("dotenv").config();

describe("POST /api/auth/login", () => {
  it("should be able to login", async () => {

    const response = await request(app).post("/api/auth/login").send({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

    expect(response.statusCode).toBe(200);
  });

  it("should return a token", async () => {

    const response = await request(app).post("/api/auth/login").send({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

    expect(typeof response.body.token == "string").toBeTruthy();
  });

  it("should return a successfull message", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

    expect(response.body.msg).toBe("Login successful");
  });

  it("should not be able to login", async () => {

    const response = await request(app).post("/api/auth/login").send({
      email: "test",
      password: "test",
    });

    expect(response.statusCode).toBe(401);
  });

  it("should return a error message", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test",
      password: "test",
    });

    expect(response.body.msg).toBe("Invalid Credentials");
  });
});
