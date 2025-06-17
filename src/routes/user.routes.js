const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const adminController=require("../controllers/AdminController");

router.get("/", userController.getProfile);
router.get("/loginpage",userController.LoginPageOfUser);



router.get("/registration",userController.RegistartionPage);
router.post("/saveUser",userController.PostUser);

router.post("/login", userController.LoginUser);


router.get("/check-session", userController.checkSession);

router.get("/services",userController.servicepage);

router.get("/dashboard",userController.UserDashBoard);
router.get("/aboutus",userController.AboutUs);
module.exports = router;
