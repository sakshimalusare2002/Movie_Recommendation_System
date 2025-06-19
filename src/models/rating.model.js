// src/models/rating.model.js
const db = require("../config/db");

exports.addOrUpdateRating = (user_id, movie_id, rating) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO ratings (user_id, movie_id, rating)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        rating = VALUES(rating),
        created_at = CURRENT_TIMESTAMP
    `;
    db.query(sql, [user_id, movie_id, rating], (err, res) =>
      err ? reject(err) : resolve(res)
    );
  });
};

exports.getMovieStats = (movie_id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT AVG(rating) AS avgRating, COUNT(*) AS totalVotes
      FROM ratings
      WHERE movie_id = ?
    `;
    db.query(sql, [movie_id], (err, results) =>
      err ? reject(err) : resolve(results[0])
    );
  });
};
