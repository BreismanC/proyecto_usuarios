const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

router.route("/").get(getUsers).post(postUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
