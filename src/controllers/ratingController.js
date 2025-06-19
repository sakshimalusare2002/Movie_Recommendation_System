// src/controllers/ratingController.js
const ratingModel = require("../models/rating.model");

exports.submitRating = (req, res) => {
  const user = req.session.user;
  const { movie_id, rating, watchedSeconds } = req.body;

  if (!user) return res.status(401).send("Please log in to rate.");
  if (+watchedSeconds < 20 * 60) {
    return res
      .status(400)
      .send("You must watch at least 20 minutes before rating.");
  }

  exports.ratingModel
    .addOrUpdateRating(user.user_id, movie_id, rating)
    .then(() => {
      res.redirect(`/movies/${movie_id}?rated=true`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to save rating.");
    });
};
