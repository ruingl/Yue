// database/connectDB/connectDB.js

const { Sequelize } = require("sequelize");
const path = require("path");
const gradient = require("gradient-string");

const databasePath = path.join(__dirname, "../data/yue.sqlite");

// Create a Sequelize instance with SQLite dialect and specified storage
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
  logging: false, // Set logging to false to disable Sequelize logs
});

// Check if the database file exists, if not, create it
(async () => {
  try {
    await sequelize.authenticate(); // Test the connection to the database

    console.log(
      gradient.cristal(
        "[ DATABASE ] : Connection to SQLite has been established successfully.",
      ),
    );

    // Sync the models with the database
    await sequelize.sync();

    console.log(
      gradient.cristal(
        "[ DATABASE ] : Models have been synchronized with the database.",
      ),
    );

    console.log("");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
