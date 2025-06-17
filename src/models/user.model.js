let db=require("../config/db");

exports.registeruserIn=(username,email,password,role)=>{
    let sql="insert into users  (username,email,password,role) values (?,?,?,?)";

    return new Promise((resolve,reject)=>{
        db.query(sql,[username,email,password,role],(err,result)=>{
            if(err)
            {
                return reject(err);
            }
            else{
            resolve(result);
            }
        })
    })       
}
//find the duplicate users in it
exports.findUserByEmailAndUsername = (email, username) => {
    let sql = "SELECT * FROM users WHERE email = ? OR username = ? " ;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [email, username ], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result.length > 0 ? result[0] : null);
            }
        });
    });
};


//used to check the user login details
exports.findUserByEmail = (email) => {
  let sql = "SELECT * FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0 ? result[0] : null);
    });
  });
};




