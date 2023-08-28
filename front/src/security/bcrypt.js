import bcrypt from "bcryptjs";

export const tokenEncoder = async (token) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedtoken = await bcrypt.hash(token, salt);
    return hashedtoken;
  } catch (error) {
    throw new Error("Error al encriptar el token");
  }
};

export const tokenValidation = async (token, hashedtoken) => {
  try {
    const matchedtoken = await bcrypt.compare(token, hashedtoken);
    return matchedtoken;
  } catch (error) {
    throw new Error("Error al comparar el token");
  }
};
