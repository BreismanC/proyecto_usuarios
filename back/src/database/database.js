const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("proyecto_usuarios_db", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize