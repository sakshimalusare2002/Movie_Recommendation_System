
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


exports.LoginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("Received login:", email, password); 

  models.findUserByEmail(email)
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.redirect("/loginpage");
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            console.log("Password mismatch");
            return res.redirect("/loginpage");
          }

          console.log("Login successful. User role:", user.role); 

          if (user.role === "admin") {
            return res.redirect("/adminpage");
          } else if (user.role === "user") {
            return res.redirect("/userpage");
          } else {
            console.log("Unknown role");
            return res.redirect("/loginpage");
          }
        });
    })
    .catch((err) => {
      console.error("Login error:", err);
      return res.redirect("/loginpage");
    });
};



