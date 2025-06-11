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

exports.findUserByEmailOrUsername = (email, username,role) => {
    let sql = "SELECT * FROM users WHERE (email = ? OR username = ?) AND role= ? " ;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [email, username , role], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result.length > 0 ? result[0] : null);
            }
        });
    });
};
