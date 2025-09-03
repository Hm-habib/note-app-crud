const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


router.get("/login-user", userController.welcomePage);

// sign-up btn to login page
router.post("/user-signup", userController.signupPage);

// log-in btn to mainInterface(notes/index)
router.post("/user/login", userController.loginPage)

// log-out btn 
router.post("/user-logout", userController.logout)


module.exports = router;
