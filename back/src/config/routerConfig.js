const initRoute = require("../routes/index.routes");

const routerConfig = (app) => {
  app.use("/", initRoute()); // to access api routes should always start with /
};

module.exports = routerConfig;
