// commands/index.js

const {
  getUserInfoFromDB,
  addUserToDB,
  listUsers,
} = require("../controller/userData");
const {
  getThreadInfoFromDB,
  addThreadToDB,
  listThreads,
} = require("../controller/threadsData");

module.exports = {
  addUserToDB,
  listUsers,
  getThreadInfoFromDB,
  getUserInfoFromDB,
  addThreadToDB,
  listThreads,
  // Add other exports as needed...
};
