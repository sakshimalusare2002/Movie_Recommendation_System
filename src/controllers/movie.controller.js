const model = require("../models/movie.model");

// Show add movie form
exports.addMoviePage = (req, res) => {
  res.render("AddMovie.ejs");
};

// Store movie data
exports.saveMovie = (req, res) => {
  const { title, description, release_year, genre } = req.body;

  model.addMovie(title, description, release_year, genre)
    .then(() => {
      res.render("AddMovie", { msg: "Movie added successfully!" });
    })
    .catch((err) => {
      console.error("Error saving movie:", err);
      res.status(500).send("Error saving movie");
    });
};
