


let movieModel = require("../models/watchlist.model");


exports.watchlistPage = (req, res) => {
  const user = req.session.user || { user_id: 1 }; // you can change this later

  movieModel.getAllMovies()
    .then((movies) => {
      res.render("watchlist", { movies, user });
    });
};

exports.insertToWatchList = (req, res) => {
  const movie_id = req.body.movie_id;
  const user_id = req.session.user?.user_id;

  if (!user_id) {
    return res.status(401).send("Unauthorized: Please log in.");
  }

  console.log("Logged in user_id:", user_id);
  console.log("Selected movie_id:", movie_id);

  model.addTowatchlist(user_id, movie_id)
    .then(() => {
      res.send("Movie added successfully to watchlist.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to add movie to watchlist.");
    });
};









