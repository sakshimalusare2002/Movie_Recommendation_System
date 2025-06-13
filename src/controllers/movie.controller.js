const model = require("../models/movie.model");

// Show add movie form
exports.addMoviePage = (req, res) => {
 // res.render("AddMovie.ejs");
 res.render("addmoviePage.ejs");

};

// Store movie data
exports.saveMovie = (req, res) => {
  const { title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url } = req.body;

  model.addMovie(title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url)
    .then(() => {
      //res.render("save", { msg: "Movie added successfully!" });
      //res.send("movie add ");
      res.send("movie send succesfully");
    })
    .catch((err) => {
      console.error("Error saving movie:", err);
      res.status(500).send("Error saving movie");
    });
};

exports.viewSaveMovies = (req, res) => {
  model.getallMovies()
    .then((movies) => {
      res.render("viewMovieDetails", { movies });
    })
    .catch((err) => {
      console.error("Error fetching movies:", err);
      res.status(500).send("Error saving movie");
    });
};


