// src/routes/rating.routes.js
const router = require("express").Router();
const ratingController = require("../controllers/ratingController");

router.post("/rate", ratingController.submitRating);

module.exports = router;
