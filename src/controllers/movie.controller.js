const model = require("../models/movie.model");
const rating =require("../models/rating.model");
// Show add movie form
exports.addMoviePage = (req, res) => {
  res.render("addmoviePage.ejs");
};

exports.saveMovie = (req, res) => {
  const { title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url, movie_url } = req.body;

  model.addMovie(title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url, movie_url)
    .then(() => {
      res.render("addmoviePage", { msg: "✅ Movie added successfully!" });
    })
    .catch(err => {
      console.error("Error saving movie:", err);
      res.status(500).send("Error saving movie");
    });
};


// exports.viewSaveMovies = (req, res) => {
//   model.getallMovies()
//     .then(movies => {
//       //console.log("Fetched Movies:", movies); // Print to console
//       res.render("viewMovieDetails.ejs", { movies });
//     })
//     .catch(err => {
//       console.error("Error fetching movies:", err);
//       res.status(500).send("Error loading movies");
//     });
// };
exports.viewSaveMovies = (req, res) => {
  model.getallMovies()  // getallMovies returns a Promise since you're using .then()
    .then(movies => {
      // Fetch rating stats for each movie in parallel
      const statsPromises = movies.map(movie =>
        rating.getMovieStats(movie.movie_id)
          .then(stats => ({
            id: movie.movie_id,
            avgRating: stats.avgRating,
            totalVotes: stats.totalVotes
          }))
      );

      return Promise.all(statsPromises).then(statsArray => {
        // Map stats by movie id for quick lookup
        const statsMap = statsArray.reduce((acc, stat) => {
          acc[stat.id] = stat;
          return acc;
        }, {});
        res.render("viewMovieDetails", { movies, statsMap });
      });
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
    .then(() => {
      console.log("Movie updated successfully");
      res.redirect("/movies/viewMovies");
    })
    .catch(err => {
      console.error("Error updating movie:", err);
      res.status(500).send("Error updating movie");
    });
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

exports.adminDashboard=(req,res)=>{
    let userCountQuery='select count(*)as totalUsers from users';
    let loginCountQuery='select sum(login_count)as totalLogins from users';


    models.getUserAndLoginCounts(userCountQuery,loginCountQuery).then(({ totalUsers, totalLogins }) => {
      res.render("AdminDashboard", {
        user: req.session.user,
        totalUsers,
        totalLogins
      });
    })
    .catch((err) => {
      console.error("Error loading dashboard:", err);
      res.status(500).send("Dashboard error");
    });
};

exports.UserDashBoard = async (req, res) => {
  const email = req.session.email || req.user?.email;

  try {
    const user = await models.getUserByEmail(email);
    const userId = user.id;

    const topGenres = await models.getTopGenresByUser(userId);
    const recommendedMovies = await models.getMoviesByGenresExcludingWatched(userId, topGenres);

    res.render("userDashboard", {
      user,
      movies: recommendedMovies
    });
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Error loading recommendations.");
  }
};

        
