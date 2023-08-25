const userSchema = require("../utils/userSchema");

//Validate that the param is type: integer
const idFormatValidation = (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({
      status: "ERROR",
      message: "Id no tiene formato válido. Verificar que el ID sea numérico",
    });
  }
  next();
};

//Validation of required fields (name, lastname, email, password)
const requiredFieldsValidation = (req, res, next) => {
  let fields = Object.keys(req.body);
  let files = null;
  const errors = {};

  if (req.files) {
    files = Object.keys(req.files);
    fields = fields.concat(files);
  }

  const fieldsExpected = files
    ? Object.values(userSchema).length
    : Object.values(userSchema).filter((field) => field !== userSchema.IMAGE)
        .length;

  console.log({fields})
  
  if (fields.length !== fieldsExpected || (files && files.length != 1)) {
    errors.expected = `${fieldsExpected} campos`;
    errors.received = `${fields.length} campos`;

    return res.status(400).json({
      status: "ERROR",
      message: "La cantidad de campos no es permitida",
      details: errors,
    });
  }
  next();
};

//Validates that the required fields are equal to the required fields in User schema
const fieldsDefinedValidation = (req, res, next) => {
  let fields = Object.keys(req.body);
  const userSchemaArray = Object.values(userSchema);
  const errors = {};
  let files;

  if (req.files) {
    files = Object.keys(req.files);
    fields = [...fields, ...files];
  }

  fields.forEach((field) => {
    if (!userSchemaArray.includes(field))
      errors[field] = `El campo ${field} no es permitido`;
  });

  if (Object.keys(errors).length != 0) {
    return res.status(400).json({
      status: "ERROR",
      message: "Los campos no son válidos",
      details: errors,
    });
  }
  next();
};

//Validations of values-fields
const valuesofFieldsValidations = {
  //Name validation(the name must be of type string and have a maximum length of 100 characters)
  name: (name) => {
    return typeof name === "string" && /^[A-Za-z ]{1,100}$/.test(name);
  },
  //Lastname validation(the lastname must be of type string and have a maximum length of 100 characters)
  lastname: (lastname) => {
    return typeof lastname === "string" && /^[A-Za-z ]{1,100}$/.test(lastname);
  },
  //Email validation(The email must include '@' and '.')
  email: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  //Password validation (the password must include uppercase, lowercase, special characters, minimum length of 6 and maximum of 12 characters)
  password: (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    return (
      typeof password === "string" &&
      hasUpperCase &&
      hasNumber &&
      hasSpecialChar &&
      password.length >= 6 &&
      password.length <= 12
    );
  },
};

//Data Type Validation
const dataTypeValidation = (req, res, next) => {
  const errors = {};
  const fieldsAndValues = Object.entries(req.body);

  fieldsAndValues.forEach((field) => {
    if (!valuesofFieldsValidations[`${field[0]}`](field[1])) {
      errors[
        `${field[0]}`
      ] = `El campo ${field[0]} no cumple con el formato requerido`;
    }
  });

  if (Object.keys(errors).length != 0) {
    return res.status(400).json({
      status: "ERROR",
      message: "Los campos no cumplen con los formatos válidos",
      details: errors,
    });
  }
  next();
};

const userValidations = {
  idFormatValidation,
  requiredFieldsValidation,
  fieldsDefinedValidation,
  dataTypeValidation,
};

module.exports = userValidations;
