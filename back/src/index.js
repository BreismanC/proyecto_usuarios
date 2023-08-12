const app = require("./app");
const config = require("./config/globalConstantsconfig");
const sequelize = require("./database/database");

// require("./models/users");

console.log(`NODE_ENV=${config.NODE_ENV}`);

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection established successfully");

    app.listen(config.PORT, config.HOST, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Database connection error", error);
  }
}

main();
