
let jwt=require("jsonwebtoken");
let bcrypt=require("bcrypt");
let models=require("../models/user.model");


exports.getProfile = (req, res) => {
  res.render("index.ejs")
};
exports.LoginPageOfUser=(req,res)=>{
  res.render("UserLogin.ejs")
}
exports.RegistartionPage=(req,res)=>{
  res.render("UserRegistration.ejs")
}
exports.PostUser=(req,res)=>{
 

  let {username,email,password,role}=req.body;

  bcrypt.hash(password,10)
  .then((hashedPassword)=>{
    return models.registeruserIn(username,email,password,role)
  })
  
  .then((result)=>{
    console.log("user register");

    const token = jwt.sign(
      {
        username, email, role}, 
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
     res.send("user register succesfullyy",token);
     res.end();
  })
  .catch((err)=>{
    console.log("error");
     res.send("user not register");
  });
}