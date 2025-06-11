const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getProfile);
router.get("/loginpage",userController.LoginPageOfUser);



router.get("/registration",userController.RegistartionPage);
router.post("/saveUser",userController.PostUser);
module.exports = router;
//hgfhagf