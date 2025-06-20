const db = require("../config/db");

exports.getUserRating = (user_id, movie_id) => {
  return db.promise().query(
    "SELECT rating FROM ratings WHERE user_id = ? AND movie_id = ?",
    [user_id, movie_id]
  );
};

exports.addOrUpdateRating = (user_id, movie_id, rating) => {
  return db.promise().query(
    `INSERT INTO ratings (user_id, movie_id, rating) 
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
    [user_id, movie_id, rating]
  );
};
