const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const adminController=require("../controllers/AdminController");
const movieController=require("../controllers/movie.controller");

router.get("/add", movieController.addMoviePage);

// Save Movie to Database
router.post("/save", movieController.saveMovie);

// View All Movies
router.get("/viewMovies", movieController.viewSaveMovies);

// Show Edit Movie Form
router.get("/editmovie/:id", movieController.editMoviePage);

// Update Movie
router.post("/updatemovie/:id", movieController.updateMovie);

// Delete Movie
router.get("/deletemovie/:id", movieController.deleteMovie);

router.get("/logoutAdmin", adminController.logoutAdmin);

router.get("/dashboard", movieController.UserDashBoard);

module.exports = router;
