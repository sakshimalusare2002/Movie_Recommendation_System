const db = require("../config/db");

//add movies 
exports.addMovie = (title, description, release_year, genre) => {
  const sql = "INSERT INTO movies (title, description, release_year, genre) VALUES (?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [title, description, release_year, genre], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};