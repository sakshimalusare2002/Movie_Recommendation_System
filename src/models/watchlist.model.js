let db=require("../config/db");

exports.getAllMovies = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM movies";
    db.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.addTowatchlist=(user_id,movie_id)=>{
    return new Promise((resolve,reject)=>{
        let sql='insert into watchlist (user_id,movie_id)values(?,?)';
        db.query(sql,[user_id,movie_id],(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
        })
}