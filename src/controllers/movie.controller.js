const model = require("../models/movie.model");

// Show add movie form
exports.addMoviePage = (req, res) => {
  res.render("addmoviePage.ejs");
};

exports.saveMovie = (req, res) => {
  const { title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url,movie_url } = req.body;
  model.addMovie(title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url,movie_url)
    .then(() => res.send("Movie saved successfully"))
    .catch(err => {
      console.error("Error saving movie:", err);
      res.status(500).send("Error saving movie");
    });
};

exports.viewSaveMovies = (req, res) => {
  model.getallMovies()
    .then(movies => {
      console.log("Fetched Movies:", movies); // Print to console
      res.render("viewMovieDetails.ejs", { movies });
    })
    .catch(err => {
      console.error("Error fetching movies:", err);
      res.status(500).send("Error loading movies");
    });
};


exports.editMoviePage = (req, res) => {
  const id = req.params.id;
  model.getMovieById(id)
    .then(movie => res.render("editMovies.ejs", { movie }))
    .catch(err => res.status(500).send("Error loading movie for edit"));
};

exports.updateMovie = (req, res) => {
  const id = req.params.id;
  model.updateMovie(id, req.body)
    .then(() => res.redirect("/movies/viewMovies"))
    .catch(err => res.status(500).send("Error updating movie"));
};

exports.deleteMovie = (req, res) => {
  const id = req.params.id;
  model.deleteMovie(id)
    .then(() => res.redirect("/movies/viewMovies"))
    .catch(err => res.status(500).send("Error deleting movie"));
};

exports.genre=(req,res)=>{
    res.send("welcome to genre");
}

