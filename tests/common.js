const request = require("supertest");
const app = require("../app");

async function getHeaders() {
    const response = await request(app).post("/api/auth/login").send({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
    });

    return {
        Authorization: "bearer " + response.body.token,
        "Content-Type": "application/json",
    };
}

module.exports = {
    getHeaders,
};