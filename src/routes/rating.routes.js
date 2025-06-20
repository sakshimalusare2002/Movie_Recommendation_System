// src/routes/rating.routes.js
const router = require("express").Router();
const ratingController = require("../controllers/ratingController");
router.get('/rate/:movie_id', ratingController.getRatingForm);

router.post("/rate", ratingController.submitRating);

module.exports = router;
