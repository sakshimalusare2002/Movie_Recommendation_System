// src/routes/rating.routes.js
const router = require("express").Router();
const ratingController = require("../controllers/ratingController");

router.get('/rate/:movie_id', ratingController.getRatingPage);

router.post("/rate", ratingController.submitRating);
router.get("/rated-movies", ratingController.viewRatedMovies);
module.exports = router;
