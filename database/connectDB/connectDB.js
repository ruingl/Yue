const { Sequelize } = require("sequelize");
const path = require("path");

const databasePath = path.resolve(__dirname, "../data/yueDB.db");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
});

module.exports = sequelize;