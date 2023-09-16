require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  DATABASE: process.env.DATABASE,
  USER_DB: process.env.USER_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  SEQUELIZE_DIALECT: process.env.SEQUELIZE_DIALECT,
  WEBHOOK_ID: process.env.WEBHOOK_ID,
  WEBHOOK_TOKEN: process.env.WEBHOOK_TOKEN,
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
};
