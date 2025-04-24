// Import the built-in http module to create a server
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/datails.routes");
const rateLimit = require("express-rate-limit");
const db = require("./database");
const express = require("express");
const cors=require("cors")
// Define the port number for the server
const port = 4000;
const app = express();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 1 minutes",
});

app.use(cors({
  allowedHeaders:"*",
  
}))
app.use(limiter);
app.use(express.json());
app.use(bodyParser.json());
//connect to database
db();
module.exports = app;
//middleware to pass the json bodies

//Routes
app.use("/", userRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
