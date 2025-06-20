const ratingModel = require("../models/rating.model");
const movieModel = require("../models/movie.model");

// exports.getRatingPage = (req, res) => {
//   const { movie_id } = req.params;

//   movieModel.getMovieById(movie_id)
//     .then(([rows]) => {
//       const movie = rows[0];
//       if (!movie) return res.status(404).send("Movie not found");

 
//       const rated = req.query.rated === "true";

//       res.render("ratingform", {
//         movie,
//         user: req.session.user,
//         rated 
//       });
//     })
//     .catch((err) => {
//       console.error("Error in getRatingPage:", err);
//       res.status(500).send("Server Error");
//     });
// };


exports.getRatingPage = (req, res) => {
  const { movie_id } = req.params;

  if (!req.session.user) {
    return res.status(401).send("Unauthorized: User not logged in");
  }

  const user_id = req.session.user.user_id;
  const rated = req.query.rated === 'success';

  Promise.all([
    movieModel.getMovieById(movie_id),
    ratingModel.getUserRating(user_id, movie_id)
  ])
    .then(([movieResult, ratingResult]) => {
      const movie = movieResult[0][0];
      const userRating = ratingResult[0][0]?.rating || null;

      res.render("ratingform", {
        movie,
        user: req.session.user,
        userRating,
        rated
      });
    })
    .catch((err) => {
      console.error("Error loading rating page:", err);
      res.status(500).send("Server error");
    });
};


exports.submitRating = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized: User not logged in");
  }

  const { movie_id, rating, watchedTime } = req.body;
  const user_id = req.session.user.user_id;

  console.log("movie_id:", movie_id);
  console.log("rating:", rating);
  console.log("user_id:", user_id);
  console.log("watchedTime:", watchedTime);

  if (!user_id || !movie_id || !rating) {
    return res.status(400).send("Missing user, movie, or rating.");
  }

  if (Number(watchedTime) < 60) {
    return res.status(400).send("⚠ Must watch at least 1 minute before rating.");
  }

  ratingModel.addOrUpdateRating(user_id, movie_id, rating)
    .then(() => {
      console.log("Rating saved!");
      res.redirect("/userDashboard?rated=success");
    })
    .catch((err) => {
      console.error("Error submitting rating:", err);
      res.status(500).send("Failed to rate movie");
    });
};


exports.viewRatedMovies = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized: User not logged in");
  }

  const userId = req.session.user.user_id;
  console.log("Logged in user_id:", userId);

  ratingModel.getRatedMoviesByUser(userId)
    .then((ratedMovies) => {
      res.render("ratedMovies", { movies: ratedMovies });
    })
    .catch((err) => {
      console.error("Error fetching rated movies:", err);
      res.status(500).send("Server Error");
    });
};
