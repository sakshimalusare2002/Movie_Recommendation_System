const db = require("../config/db");

exports.addMovie = (
  title,
  description,
  release_date,
  genre,
  director,
  language,
  country,
  budget,
  revenue,
  runtime,
  poster_url,
  trailer_url,
  movie_url
) => {
  const sql = `INSERT INTO movies 
    (title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url, movie_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [title, description, release_date, genre, director, language, country, budget, revenue, runtime, poster_url, trailer_url, movie_url],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};


exports.getallMovies = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM movies", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM movies WHERE movie_id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

exports.updateMovie = (id, movieData) => {
  const {
    title, description, release_date, genre, director,
    language, country, budget, revenue, runtime,
    poster_url, trailer_url, movie_url
  } = movieData;

  const sql = `
    UPDATE movies SET 
      title = ?, description = ?, release_date = ?, genre = ?, director = ?, 
      language = ?, country = ?, budget = ?, revenue = ?, runtime = ?, 
      poster_url = ?, trailer_url = ?, movie_url = ?
    WHERE movie_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [
      title, description, release_date, genre, director,
      language, country, parseFloat(budget), parseFloat(revenue), parseInt(runtime),
      poster_url, trailer_url, movie_url,
      parseInt(id) 
    ], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


exports.deleteMovie = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM movies WHERE movie_id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

