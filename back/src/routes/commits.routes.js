const express = require("express");
const router = express.Router();

const CommitsController = require("../controllers/commits.controller");

router
  .route("/")
  .get(CommitsController.getCommits)
  .post(CommitsController.postCommit);

router.route("/:id").get(CommitsController.getCommitById);

module.exports = router;
