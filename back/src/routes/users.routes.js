const express = require("express");
const router = express.Router();
const {
  idFormatValidation,
  // requiredFieldsValidation,
  // fieldsDefinedValidation,
  // dataTypeValidation,
} = require("../middlewares/usersValidators");

const validationUser = require("../validators/users");

const usersController = require("../controllers/users.controller");

router
  .route("/")
  .get(usersController.getUsers)
  .post(validationUser, usersController.postUser);

router
  .route("/:id")
  .get(idFormatValidation, usersController.getUserById)
  .put(idFormatValidation, validationUser, usersController.updateUser)
  .delete(idFormatValidation, usersController.deleteUser);

module.exports = router;
