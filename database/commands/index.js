// commands/index.js

const { getUserInfo, addUserToDB, listUsers } = require("../controller/userData");
const { getThreadInfo } = require("../controller/threadsData");

module.exports = {
  addUserToDB,
  listUsers,
  getThreadInfo,
  getUserInfo,
  // Add other exports as needed...
};