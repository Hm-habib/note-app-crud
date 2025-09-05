const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const signupOk = (req, res) => {
  res.render("user/signup");
};

const signupToMainPage = async (req, res) => {
  try {
    const { userName, Email } = req.body;

     let existingUserName = await userModel.findOne({ userName });
    if (existingUserName) {
      return res.status(400).send("This username already taken , please enter unique username!");
    }

    let existingUserEmail = await userModel.findOne({ Email });
    if (existingUserEmail) {
      return res.status(400).send("This email already has been stored in database,  please enter unique email address.");
    }

    let user = new userModel(req.body);
    await user.save();

    req.session.user = user;
    res.render("user/login");
  } catch (err) {
    if (err.code === 11000) {
    } else if (err.name === "ValidationError") {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("Server Error!");
    }
  }
};


// log-in btn to mainInterface(notes/index)
const loginPage = async (req, res) => {
  const { username, password } = req.body;

  // match username, user input and database
  const user = await userModel.findOne({ userName: username });
  if (!user) res.send("username or password is incorrect");

  // match password, user input and database
  let isMatch = await bcrypt.compare(password, user.Password);
  if (!isMatch) res.send("username or password is incorrect");

  req.session.user = user;

  res.redirect("/mainInterface");
};

// log-out btn
const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const userDashboard = async (req, res) => {
  let currentUser = req.session.user;
    
  res.render("user/user-dashboard", {user: currentUser} );
};
module.exports = {
  signupOk,
  signupToMainPage,
  loginPage,
  logout,
  userDashboard,
};
