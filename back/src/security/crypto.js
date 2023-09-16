const crypto = require("crypto-js");
const globalConstants = require("../config/globalConstantsconfig");

function encryptText(text) {
  return crypto.AES.encrypt(text, globalConstants.CRYPTO_SECRET_KEY).toString();
}

function decryptText(ciphertext) {
  const bytes = crypto.AES.decrypt(
    ciphertext,
    globalConstants.CRYPTO_SECRET_KEY
  );
  return bytes.toString(crypto.enc.Utf8);
}

module.exports = {
  encryptText,
  decryptText,
};
