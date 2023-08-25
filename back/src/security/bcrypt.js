const bcrypt = require("bcryptjs");

const passwordEncoder = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error al encriptar la contraseña");
  }
};

const passwordValidation = async (password, hashedPassword) => {
  try {
    const matchedPassword = await bcrypt.compare(password, hashedPassword);
    return matchedPassword;
  } catch (error) {
    throw new Error("Error al comparar la contraseña");
  }
};

module.exports = {
  passwordEncoder,
  passwordValidation,
};
