
const userModel = require("../model/userModel");

const signPage = (req, res) => {
  res.render("user/signup");
};

const homePage = async (req, res) => {
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

module.exports = {
  signPage,
  homePage,
};
