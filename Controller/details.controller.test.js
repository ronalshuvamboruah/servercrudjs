// /tests/user.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/details.model");
const dbURI =
  "mongodb+srv://RonalBoruah:123%40Shuvam@amazoncluster.t4lx4ia.mongodb.net/?retryWrites=true&w=majority&appName=AmazonCluster";
// Connect to an in-memory database for testing (You can also use Mongo Memory Server)
beforeAll(async () => {
  const url = dbURI;
  await mongoose.connect(dbURI);
});

// Close the database connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User CRUD Operations", () => {
  let userId;

  // Test: Create a user
  it("should create a new user", async () => {
    const response = await request(app)
      .get("/users")

      .expect(200);

    // Save userId for later use
    // userId = response.body._id;

    // expect(response.body).toHaveProperty('_id');
    // expect(response.body.name).toBe('John Doe');
    // expect(response.body.email).toBe('johndoe@example.com');
  });
  it("should create a new user", async() => {
    const response = await request(app)
    .post('/create')
    .send({
      name: 'Johna Doe',
      email: 'johndoae@example.com',
      password: 'password123',
      age:29
    })
    .expect(201);
  });

  // Test: Get user by ID
  it("should retrieve a user by ID", async () => {
    const response = await request(app).get(`/api/user/${userId}`).expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("johndoe@example.com");
  });

  // Test: Update user by ID
  it("should update an existing user", async () => {
    const response = await request(app)
      .put(`/api/user/${userId}`)
      .send({
        name: "John Smith",
        email: "johnsmith@example.com",
      })
      .expect(200);

    expect(response.body.name).toBe("John Smith");
    expect(response.body.email).toBe("johnsmith@example.com");
  });

  // Test: Delete user by ID
  it("should delete a user by ID", async () => {
    const response = await request(app)
      .delete(`/api/user/${userId}`)
      .expect(200);

    expect(response.body.message).toBe("User deleted");
  });

  // Test: Attempt to get a deleted user
  it("should return 404 when getting a deleted user", async () => {
    const response = await request(app).get(`/api/user/${userId}`).expect(404);

    expect(response.body.message).toBe("User not found");
  });
});
