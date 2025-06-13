const db = require("../config/db");

//add movies 
exports.addMovie = (title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url) => {
  const sql = "INSERT INTO movies (title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.getallMovies=()=>{
    const sql="select * from movies";
    return new Promise((resolve,reject)=>{
      db.query(sql,(err,result)=>{
        if(err){
          reject(err);
        }
        else{
          resolve(result);
        }
      })
    })
}