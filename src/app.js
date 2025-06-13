let express = require("express");
let bodyparser = require("body-parser");
let cors = require("cors");
let path=require("path");
require("dotenv").config();
const db = require("./config/db");

let app = express();
app.set("view engine",'ejs');
app.set("views", path.join(__dirname, "client"));
app.use(express.static('public'));


app.use(express.static(path.join(__dirname, "client")));


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(express.static('public'))



let userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

module.exports = app;
