const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const adminController=require("../controllers/AdminController");
const movieController=require("../controllers/movie.controller");

router.get("/add", movieController.addMoviePage);
router.post("/save", movieController.saveMovie);

module.exports=router;

