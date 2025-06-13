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

  models.findUserByEmailAndUsername(email, username)
    .then((existingUser) => {
      if (existingUser) {
        return res.render("UserRegistration", { msg : "User already exists with this role"});
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

              // Send response
             return res.render("UserRegistration",{msg: "user data save successfully"});
            });
        });
    })
    .catch((err) => {
      console.error("Error in PostUser:", err);
      res.send("User not registered");
    });
};


//to open the page after login
exports.LoginUser = (req, res) => {
  const { email, password } = req.body;

  models.findUserByEmail(email)
    .then((user) => {
      if (!user) {
        return res.render("UserLogin.ejs", { msg: "User not found" });
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.render("UserLogin.ejs", { msg: "Incorrect password" });
          }

          if (user.role === "ADMIN") {
           // return res.send("Welcome to admin page");
           res.render("AdminDashboard.ejs");
          } else if (user.role === "USER") {
            //return res.send("Welcome to user page");
            res.render("userDashboard.ejs")
          } else {
            return res.render("UserLogin.ejs", { msg: "Invalid role" });
          }
        });
    })
    .catch((err) => {
      console.error("Login error:", err);
      res.render("UserLogin.ejs", { msg: "Login Error" });
    });
};
