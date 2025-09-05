const notesRoute = require("./noteRoute");
const userRoute = require("./userRoute");
const { isAuthenticated } = require('../middleware/authMiddleware')

module.exports = (app) => {
  app.use("/notes", isAuthenticated, notesRoute);
  app.use("/users", userRoute);
};
