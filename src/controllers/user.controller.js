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

  models.registeruserIn(username,email,password,role)
  .then((result)=>{
    console.log("user register");
     res.send("user register succesfullyy");
  }).catch((err)=>{
    console.log("error");
     res.send("user not register");
  })
}