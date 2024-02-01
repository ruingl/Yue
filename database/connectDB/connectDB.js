const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const databasePath = path.join(__dirname, "../data/yueDB.db");
const defaultModelPath = path.join(__dirname, "../data/defaultModel.sql");

// Check if the database file exists
if (!fs.existsSync(databasePath)) {
  // If it doesn't exist, run the defaultModel.sql using sqlite3
  execSync(`sqlite3 ${databasePath} < ${defaultModelPath}`);
}

// Create a Sequelize instance with SQLite dialect and specified storage
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
  logging: false, // Set logging to false to disable Sequelize logs
});

module.exports = sequelize;