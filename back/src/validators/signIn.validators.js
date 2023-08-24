const { check } = require("express-validator");
const validateResult = require("../utils/validateResult");

const validationsSignIn = [
  check("email")
    .notEmpty()
    .withMessage("El campo 'email' es requerido")
    .isEmail()
    .withMessage("El correo electrónicono tiene un formato válido"),

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

module.exports = validationsSignIn;
