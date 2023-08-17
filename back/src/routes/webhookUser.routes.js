const express = require("express");
const router = express.Router();

const webhookUsersController = require("../controllers/webhookUsers.controller");

router
  .route("/create-user")
  .post(
    webhookUsersController.createUserNotification
  )
  ;
  router.route("/commit-notification")
  .post(
    webhookUsersController.commitNotification
  )
  ;

module.exports = router;
