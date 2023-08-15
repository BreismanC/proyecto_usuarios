const { check } = require("express-validator");
const validateResult = require("../utils/validateResult");

const validationsUser = [
  check("name")
    .exists()
    .notEmpty()
    .withMessage("El campo 'name' es requerido")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres")
    .isAlpha()
    .withMessage("El nombre solo puede contener caracteres alfabéticos")
    .isLength({ min: 1, max: 100 })
    .withMessage("El nombre debe tener entre 1 y 100 caracteres"),

  check("lastname")
    .exists()
    .notEmpty()
    .withMessage("El campo 'lastname' es requerido")
    .isString()
    .withMessage("El apellido debe ser una cadena de caracteres")
    .isAlpha()
    .withMessage("El apellido solo puede contener caracteres alfabéticos")
    .isLength({ min: 1, max: 100 })
    .withMessage("El apellido debe tener entre 1 y 100 caracteres"),

  check("email")
    .notEmpty()
    .withMessage("El campo 'email' es requerido")
    .isEmail()
    .withMessage("El correo electrónico tener un formato válido"),

  check("password")
    .notEmpty()
    .withMessage("El campo 'password' es requerido")
    .isLength({ min: 6, max: 12 })
    .withMessage("La contraseña debe tener entre 6 y 12 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe incluir al menos una mayúscula")
    .matches(/\d/)
    .withMessage("La contraseña debe incluir al menos un número")
    .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
    .withMessage("La contraseña debe incluir al menos un caracter especial"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = validationsUser;
