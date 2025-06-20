const db = require('../config/db'); // or your DB config path

exports.saveLike = (userId, movieId) => {
  const query = 'INSERT INTO liked_movies (user_id, movie_id) VALUES (?, ?)';
  return db.promise().execute(query, [userId, movieId]);
};

exports.getLikedMovies = (userId) => {
  const query = `
    SELECT m.* FROM liked_movies l
    JOIN movies m ON l.movie_id = m.movie_id
    WHERE l.user_id = ?
  `;
  return db.promise().query(query, [userId]);
};