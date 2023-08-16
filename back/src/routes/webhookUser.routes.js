const express = require("express");
const router = express.Router();

const webhookUsersController = require("../controllers/webhookUsers.controller");

router
  .route("/create-user")
  .post(
    webhookUsersController.createUserNotification
  );

module.exports = router;
