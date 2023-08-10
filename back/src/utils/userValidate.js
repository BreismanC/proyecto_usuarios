//Validation of required fields (name, lastname, email, password)
const requiredFields = (req, res) => {
  const fields = Object.keys(req.body);
  if (fields.length !== 4) {
    throw new Error("Cantidad de campos no permitidos");
  }
};

//Validates that the required fields are equal to the required fields in User schema
const fieldsDefined = (req, res) => {
  const fields = Object.keys(req.body);
  if (
    !fields.includes("name") ||
    !fields.includes("lastname") ||
    !fields.includes("email") ||
    !fields.includes("password")
  ) {
    throw new Error("Uno o mas campos no coinciden");
  }
};

//Validations of values-fields
//Name validation(the name and lastname must be of type string and have a maximum length of 100 characters)
const validateNameAndLastname = (name) => {
  return typeof name === "string" && /^[A-Za-z ]{1,100}$/.test(name);
};

//Email validation(The email must include '@' and '.')
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

//Password validation (the password must include uppercase, lowercase, special characters, minimum length of 6 and maximum of 12 characters)
const validatePassword = (password) => {
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
};

//Redefinir sin uso de switch
//Data Type Validation
const dataType = (req, res) => {
  const errors = {};
  const valuesFields = Object.entries(req.body);
  valuesFields.forEach((field) => {
    switch (field[0]) {
      case "name":
        if (!validateNameAndLastname(field[1]))
          errors.name =
            "El nombre debe ser de tipo 'String' y tener una longitud máxima de 100 caracteres";
        break;
      case "lastname":
        if (!validateNameAndLastname(field[1]))
          errors.lastname =
            "El apellido debe ser de tipo 'String' y tener una longitud máxima de 100 caracteres";
        break;
      case "email":
        if (!validateEmail(field[1]))
          errors.email = "El formato del correo debe incluir un '@' y un '.'";
        break;
      case "password":
        if (!validatePassword(field[1]))
          errors.password =
            "La contraseña debe incluir una mayúscula, una minúscula, un caracter especial, longitud minima de 6 y máxima de 12 caracteres ";
        break;
    }
  });

  if (Object.keys(errors).length != 0) {
    throw new Error("Los campos no cumplen con los formatos válidos");
  }
};

const userValidations = {
  requiredFields,
  fieldsDefined,
  dataType,
};

module.exports = userValidations;
