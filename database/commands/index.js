// commands/index.js

const {
  getUserInfoFromDB,
  addUserToDB,
  listUsers,
} = require("../controller/userData");
const {
  getThreadInfoFromDB,
  addThreadToDB,
} = require("../controller/threadsData");

module.exports = {
  addUserToDB,
  listUsers,
  getThreadInfoFromDB,
  getUserInfoFromDB,
  addThreadToDB,
  // Add other exports as needed...
};
