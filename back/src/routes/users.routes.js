const express = require("express");
const router = express.Router();
const {
  idFormatValidation,
  requiredFieldsValidation,
  fieldsDefinedValidation,
  dataTypeValidation,
} = require("../middlewares/usersValidators");

const usersController = require("../controllers/users.controller");

router
  .route("/")
  .get(usersController.getUsers)
  .post(
    requiredFieldsValidation,
    fieldsDefinedValidation,
    dataTypeValidation,
    usersController.postUser
  );

router
  .route("/:id")
  .get(idFormatValidation, usersController.getUserById)
  .put(
    idFormatValidation,
    requiredFieldsValidation,
    fieldsDefinedValidation,
    dataTypeValidation,
    usersController.updateUser
  )
  .delete(idFormatValidation, usersController.deleteUser);

module.exports = router;
