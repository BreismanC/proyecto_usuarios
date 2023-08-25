const config = require("../config/globalConstantsconfig");
const jwt = require("jsonwebtoken");

// secret key that we will use to encrypt the token
const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

//Payload is the information we want to store in the token
const generateToken = (payload) => {
  const options = {
    expiresIn: "1h",
  };

  // sing is responsible for encrypting the token
  const token = jwt.sign(payload, SECRET_KEY_JWT, options);

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY_JWT);
    return decoded;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { generateToken, verifyToken };
