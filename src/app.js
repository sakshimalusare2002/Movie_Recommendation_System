let express = require("express");
let bodyparser = require("body-parser");
let cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

let app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Correct path to your route file
let userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

module.exports = app;
