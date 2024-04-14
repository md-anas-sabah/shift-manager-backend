const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./Routes/user.route");
const shiftRoutes = require("./Routes/shift.route");

const { MONGOATLAS } = process.env;
mongoose
  .connect(MONGOATLAS, {})
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err);
  });

app.use(cors(), express.json());
app.use("/users", userRoutes);
app.use("/shifts", shiftRoutes);

app.listen(5000, () => {
  console.log("Server is running! port: 5000");
});
