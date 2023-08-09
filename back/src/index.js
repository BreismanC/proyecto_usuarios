const app = require("./app");
const sequelize = require("./database/database");

// require("./models/users");

const PORT = 3000;

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection established successfully");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error", error);
  }
}

main();
