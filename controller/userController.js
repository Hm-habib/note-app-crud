
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");


const welcomePage = (req, res) => {
  res.render("user/signup");
};

const signupPage = async (req, res) => {
  try {
    let user = new userModel(req.body);
    await user.save();

    req.session.user = user;

    res.render("user/login");
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send(err.message);
    }
  }
};

// log-in btn to mainInterface(notes/index)
const loginPage = async (req, res) => {
  const { username, password } = req.body;

// match username, user input and database
  const user = await userModel.findOne({ userName: username });
  if (!user) res.send('username or password is incorrect')

// match password, user input and database
  let isMatch = await bcrypt.compare(password, user.Password)
  if (!isMatch) res.send("username or password is incorrect");

  req.session.user = user;

  res.redirect("/mainInterface");

};

// log-out btn 
const logout = async (req, res)  => {
req.session.destroy();
res.redirect("/")
}

module.exports = {
  welcomePage,
  signupPage,
  loginPage,
  logout,
};
