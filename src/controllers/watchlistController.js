
let movieModel = require("../models/watchlist.model");


exports.watchlistPage = (req, res) => {
  const user = req.session.user || { user_id: 1 };
  const added = req.query.added;

  movieModel.getAllMovies()
    .then((movies) => {
      res.render("userDashboard", { movies, user, added }); //  pass added
    }).catch((err)=>{
      res.status(500).send("error fetching movies");
    })
};



// POST method to add to watchlist
exports.insertToWatchList = (req, res) => {
  const movie_id = req.body.movie_id;
  const user_id = req.session.user?.user_id;

  if (!user_id) {
    return res.status(401).send("Unauthorized");
  }

  movieModel.checkWatchlistExists(user_id, movie_id)
    .then((exists) => {
      if (exists) {
        // Already exists, redirect with ?added=duplicate
        res.redirect("/watchlistpage?added=duplicate");
      } else {
        return movieModel.addTowatchlist(user_id, movie_id).then(() => {
          res.redirect("/watchlistpage?added=true");
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding to watchlist");
    });
};

// watchlistController.js

exports.getWatchListMovies = (req, res) => {
  const user = req.session.user; // ✅ STEP 1: Get user from session

  if (!user || !user.user_id) { // ✅ STEP 2: Check if user is logged in
    return res.redirect("/?form=login"); // or send 401 Unauthorized
  }

  movieModel.getwatlistMovies(user.user_id) // ✅ STEP 3: Pass user_id
    .then((movies) => {
       console.log(movies); // Debug: Check if movie_url exists
      res.render("watchlistMovies.ejs", { movies, user }); // ✅ STEP 4: Pass user to EJS
    })
    .catch((err) => {
      console.error("Error loading watchlist:", err);
      res.status(500).send("Error loading watchlist");
    });
};






