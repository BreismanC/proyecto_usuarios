const config = require("../config/globalConstantsconfig");
const jwt = require("jsonwebtoken");

//Payload is the information we want to store in the token
const generateToken = (payload) => {
  // secret key that we will use to encrypt the token
  const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

  const options = {
    expiresIn: "1h",
  };

  // sing is responsible for encrypting the token
  const token = jwt.sign(payload, SECRET_KEY_JWT, options);

  return token;
};

module.exports = generateToken;
