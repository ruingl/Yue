// commands/index.js

const {
  getUserInfoFromDB,
  addUserToDB,
  listUsers,
} = require("../controller/userData");
const { getThreadInfo } = require("../controller/threadsData");

module.exports = {
  addUserToDB,
  listUsers,
  getThreadInfo,
  getUserInfoFromDB,
  // Add other exports as needed...
};
