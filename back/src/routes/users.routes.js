const express = require("express");
const router = express.Router();
const {
  idFormatValidation,
  requiredFieldsValidation,
  fieldsDefinedValidation,
  fieldsDefinedValidationToUpdate,
  dataTypeValidation,
} = require("../middlewares/usersValidators");

const validationsSignIn = require("../validators/signIn.validators");
const tokenValidation = require("../middlewares/authJwt");

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

router.route("/sign-in").post(validationsSignIn, usersController.signInUser);

router
  .route("/:id")
  .get(idFormatValidation, usersController.getUserById)
  .put(
    tokenValidation,
    idFormatValidation,
    fieldsDefinedValidationToUpdate,
    dataTypeValidation,
    usersController.updateUser
  )
  .delete(idFormatValidation, usersController.deleteUser);

module.exports = router;
