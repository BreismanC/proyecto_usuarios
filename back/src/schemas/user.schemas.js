const Joi = require("joi");

//!REVISAR VALIDACIÓN QUE ESTÉ FUNCIONANDO
const userSchemas = {
  createUserSchema: Joi.object({
    name: Joi.string()
      .trim()
      .lowercase()
      .required()
      .empty()
      .min(1)
      .max(100)
      .pattern(/^[A-Za-z]$/)
      .messages({
        "string.base": "El nombre debe ser de tipo texto",
        "any.required": "El nombre es obligatorio",
        "string.empty": "El nombre no debe estar vacío",
        "string.min": "El nombre debe tener al menos {#limit} caracteres",
        "string.max": "El nombre no debe tener más de {#limit} caracteres",
        "string.pattern.base": "El nombre solo permite caracteres alfabéticos",
      }),
    lastname: Joi.string()
      .trim()
      .lowercase()
      .required()
      .empty()
      .min(1)
      .max(100)
      .pattern(/^[A-Za-z]$/)
      .messages({
        "string.base": "El apellido debe ser de tipo texto",
        "any.required": "El apellido es obligatorio",
        "string.empty": "El apellido no debe estar vacío",
        "string.min": "El apellido debe tener al menos {#limit} caracteres",
        "string.max": "El apellido no debe tener más de {#limit} caracteres",
        "string.pattern.base":
          "El apellido solo permite caracteres alfabéticos",
      }),
    email: Joi.string()
      .trim()
      .lowercase()
      .required()
      .empty()
      .email({ minDomainSegments: 2 })
      .messages({
        "string.base": "El correo debe ser de tipo texto",
        "any.required": "El correo electrónico es obligatorio",
        "string.empty": "El correo electrónico no debe estar vacío",
        "string.email": "El correo electrónico debe tener un formato válido",
      }),
    password: Joi.string()
      .trim()
      .required()
      .empty()
      .min(6)
      .max(12)
      .pattern(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}|:;<>,.?~]{6,12}$/
      )
      .messages({
        "string.base": "La contraseña debe ser de tipo texto",
        "any.required": "La contraseña es obligatoria",
        "string.empty": "La contraseña no debe estar vacía",
        "string.min": "La contraseña debe tener al menos {#limit} caracteres",
        "string.max": "La contraseña no debe tener más de {#limit} caracteres",
        "string.pattern.base":
          "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
      }),
  }),
  userSchemaLogin: Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .required()
      .empty()
      .email({ minDomainSegments: 2 })
      .messages({
        "string.base": "El correo debe ser de tipo texto",
        "any.required": "El correo electrónico es obligatorio",
        "string.empty": "El correo electrónico no debe estar vacío",
        "string.email": "El correo electrónico debe tener un formato válido",
      }),
    password: Joi.string()
      .trim()
      .required()
      .empty()
      .min(6)
      .max(12)
      .pattern(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>,.?~])[A-Za-z\d!@#$%^&*()_+{}|:;<>,.?~]{6,12}$/
      )
      .messages({
        "string.base": "La contraseña debe ser de tipo texto",
        "any.required": "La contraseña es obligatoria",
        "string.empty": "La contraseña no debe estar vacía",
        "string.min": "La contraseña debe tener al menos {#limit} caracteres",
        "string.max": "La contraseña no debe tener más de {#limit} caracteres",
        "string.pattern.base":
          "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
      }),
  }),
};

module.exports = userSchemas;
