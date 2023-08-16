const config = require("../../config/globalConstantsconfig");

module.exports = {
  development: {
    username: config.USER_DB,
    password: config.PASSWORD_DB,
    database: config.DATABASE,
    host: config.HOST,
    dialect: config.SEQUELIZE_DIALECT,
    logging: false,
  },
  test: {
    username: config.USER_DB,
    password: config.PASSWORD_DB,
    database: config.DATABASE,
    host: config.HOST,
    dialect: config.SEQUELIZE_DIALECT,
  },
  production: {
    username: config.USER_DB,
    password: config.PASSWORD_DB,
    database: config.DATABASE,
    host: config.HOST,
    dialect: config.SEQUELIZE_DIALECT,
  },
};
