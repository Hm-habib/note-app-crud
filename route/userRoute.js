const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/signup-user", userController.signupOk);

// sign-up btn to login page
router.post("/user-signup-ok", userController.signupToMainPage);

// show user dashBoard
router.get("/user-dashboard", isAuthenticated, userController.userDashboard);

// log-in btn to mainInterface(notes/index)
router.post("/user/login", userController.loginPage);

// log-out btn
router.post("/user-logout", userController.logout);

module.exports = router;
