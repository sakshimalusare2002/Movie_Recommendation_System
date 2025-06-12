const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const adminController=require("../controllers/AdminController");

router.get("/", userController.getProfile);
router.get("/loginpage",userController.LoginPageOfUser);



router.get("/registration",userController.RegistartionPage);
router.post("/saveUser",userController.PostUser);

router.post("/login", userController.LoginUser);

//router.get("/adminpage",adminController.adminPagecontroller);

// router.get("/userpage", (req, res) => {
//     res.render("UserDashboard");
// });


module.exports = router;
