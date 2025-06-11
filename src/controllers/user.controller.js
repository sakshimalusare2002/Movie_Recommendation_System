
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
exports.PostUser = (req, res) => {
  const { username, email, password, role } = req.body;

  models.findUserByEmailOrUsername(email, username, role)
    .then((existingUser) => {
      if (existingUser) {
        return res.send("User already exists");
      }

      // Hash password
      return bcrypt.hash(password, 10)
        .then((hashedPassword) => {
          // Insert user into DB
          return models.registeruserIn(username, email, hashedPassword, role)
            .then(() => {
              // Generate JWT token
              const token = jwt.sign(
                { username, email, role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );

<<<<<<< Updated upstream
              // Send response
              return res.send("user data save successfully");
            });
        });
    })
    .catch((err) => {
      console.error("Error in PostUser:", err);
      res.send("User not registered");
    });
};
=======
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

exports.afterlogin=(req,res)=>{
  res.send("Login succesfully");
}
>>>>>>> Stashed changes
