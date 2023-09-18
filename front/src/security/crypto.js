import { AES, enc } from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET_KEY;

export const encryptText = (plainText) => {
  const b64 = AES.encrypt(plainText, SECRET_KEY).toString();
  const e64 = enc.Base64.parse(b64);
  const eHex = e64.toString(enc.Hex);
  return eHex;
};

export const decryptText = (cipherText) => {
  const reb64 = enc.Hex.parse(cipherText);
  const bytes = reb64.toString(enc.Base64);
  const decrypt = AES.decrypt(bytes, SECRET_KEY);
  const plain = decrypt.toString(enc.Utf8);
  return plain;
};
