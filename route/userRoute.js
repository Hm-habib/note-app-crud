const express = require("express");
const bcrypt = require("bcrypt");
const userController = require("../controller/userController");
const userModel = require("../model/userModel");
const router = express.Router();


router.get("/login-user", userController.signPage);

// sign-up btn to mainInterface
router.post("/user-signup", userController.homePage);

// log-in btn to mainInterface(notes/index)
router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

// match username, user input and database
  const user = await userModel.findOne({ userName: username });
  if (!user) res.send('username or password is incorrect')

// match password, user input and database
  let isMatch = await bcrypt.compare(password, user.Password)
  if (!isMatch) res.send("username or password is incorrect");

  req.session.user = user;

  res.redirect("/mainInterface");

  // log-out btn 
router.post("/user-logout", async (req, res)  => {
  req.session.destroy();
  res.redirect("/")
})

});

module.exports = router;
