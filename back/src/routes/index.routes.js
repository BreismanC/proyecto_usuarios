const express = require("express");
const router = express.Router();

const webhookUsers = require("./webhookUser.routes"); // import webhookUsers routes
const usersRoutes = require("./users.routes"); // import users routes
const commitsRoutes = require("./commits.routes"); // import users routes
const uploadImages = require("./uploadImages.routes");

const initRoutes = () => {
  router.use("/webhook/", webhookUsers);
  router.use("/users", usersRoutes);
  router.use("/commits", commitsRoutes);
  router.use("/upload-images", uploadImages);

  return router;
};

module.exports = initRoutes;
