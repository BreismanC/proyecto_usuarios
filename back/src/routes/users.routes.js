const express = require("express");
const router = express.Router();
const {
  idFormatValidation,
  requiredFieldsValidation,
  fieldsDefinedValidation,
  fieldsDefinedValidationToUpdate,
  dataTypeValidation,
} = require("../middlewares/usersValidators");

const validationSchema = require("../validators/validationSchema.validators");
const userSchemas = require("../schemas/user.schemas");
const tokenValidation = require("../middlewares/authJwt");

const usersController = require("../controllers/users.controller");

//!Falta implementar las validaciones para las imágenes
router
  .route("/")
  .get(usersController.getUsers)
  .post(
    validationSchema(userSchemas.createUserSchema),
    usersController.postUser
  );

router
  .route("/email-validate")
  .patch(
    tokenValidation,
    validationSchema(userSchemas.validateUser),
    usersController.validateEmail
  );

router
  .route("/password")
  .put(tokenValidation, usersController.updatePasswordByEmail);

router.route("/name").put(tokenValidation, usersController.updateNameByEmail);
router
  .route("/lastname")
  .put(tokenValidation, usersController.updateLastnameByEmail);

router
  .route("/sign-in")
  .post(
    validationSchema(userSchemas.userSchemaLogin),
    usersController.signInUser
  );

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
