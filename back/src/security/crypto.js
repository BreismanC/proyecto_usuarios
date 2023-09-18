const crypto = require("crypto-js");
const globalConstants = require("../config/globalConstantsconfig");

const encryptText = (plainText) => {
  const b64 = crypto.AES.encrypt(
    plainText,
    globalConstants.CRYPTO_SECRET_KEY
  ).toString();
  const e64 = crypto.enc.Base64.parse(b64);
  const eHex = e64.toString(crypto.enc.Hex);
  return eHex;
};

const decryptText = (cipherText) => {
  const reb64 = crypto.enc.Hex.parse(cipherText);
  const bytes = reb64.toString(crypto.enc.Base64);
  const decrypt = crypto.AES.decrypt(bytes, globalConstants.CRYPTO_SECRET_KEY);
  const plain = decrypt.toString(crypto.enc.Utf8);
  return plain;
};

module.exports = {
  encryptText,
  decryptText,
};
