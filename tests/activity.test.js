const mongoose = require("mongoose");
const request = require("supertest");

const Activity = require("../models/activity.model");
const app = require("../app");
const { getHeaders } = require("./common");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Activity.deleteMany({});
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/activity", () => {
  it("should add an activity", async () => {

    const response = await request(app)
      .post("/api/activity")
      .send({
        name: "Jogging",
        time: "3:00 PM",
      })
      .set(await getHeaders());

    expect(response.statusCode).toBe(201);
  });

  it("should return an _id", async () => {

    const response = await request(app)
      .post("/api/activity")
      .send({
        name: "Jogging",
        time: "3:00 PM",
      })
      .set(await getHeaders());

    expect(typeof response.body._id == "string").toBeTruthy();
  });

  it("should not add an activity without name", async () => {
    const response = await request(app)
      .post("/api/activity")
      .send({
        time: "3:00 PM",
      })
      .set(await getHeaders());

    expect(response.statusCode).toBe(400);
  });

  it("should not add an activity without time", async () => {
    const response = await request(app)
      .post("/api/activity")
      .send({
        name: "Jogging",
      })
      .set(await getHeaders());

    expect(response.statusCode).toBe(400);
  });
});

describe("GET /api/activities", () => {
  it("should get all the activities", async () => {
    await request(app)
      .post("/api/activity")
      .send({
        name: "Jogging",
        time: "3:00 PM",
      })
      .set(await getHeaders());

    const response = await request(app)
      .get("/api/activities")
      .set(await getHeaders());

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
