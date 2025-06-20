function isAuthenticated(req, res, next) {
  if (!req.session.user || !req.session.user.user_id) {
    return res.render("UserLogin.ejs", { msg: "Please log in first." });
  }
  next();
}
