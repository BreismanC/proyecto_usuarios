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
