const express = require("express");
const router = express.Router();

const usersRoutes = require("./users.routes"); // import users routes

const initRoutes = () => {
  router.use("/users", usersRoutes);

  return router;
};

module.exports = initRoutes;
