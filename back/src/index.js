const app = require("./app");
const config = require("./config/globalConstantsconfig");
const sequelize = require("./database/models/index");

require("dotenv").config();

// require("./models/users");

console.log(`NODE_ENV=${config.NODE_ENV}`);
const { DATABASE } = process.env;

console.log({ DATABASE });

async function main() {
  try {
    app.listen(config.PORT, config.HOST, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Database connection error", error);
  }
}

main();
