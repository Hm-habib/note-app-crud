const notesRoute = require("./noteRoute");
const userRoute = require("./userRoute");

module.exports = (app) => {
  app.use("/notes", notesRoute);
  app.use("/users", userRoute);
};
