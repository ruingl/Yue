const { Sequelize } = require("sequelize");
const path = require("path");

const databasePath = "../data/yueDB.db";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
  logging: false, // Set logging to false to disable Sequelize logs
});

module.exports = sequelize;