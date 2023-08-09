const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("project_users_db", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
