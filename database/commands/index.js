// database/commands/index.js

const threadsDataController = require("../controller/threadsDataController");
const userDataController = require("../controller/userDataController");

module.exports = {
  getThreadInfoFromDB: threadsDataController.getThreadInfoFromDB,
  addThreadToDB: threadsDataController.addThreadToDB,
  listThreads: threadsDataController.listThreads,
  getUserInfoFromDB: userDataController.getUserInfoFromDB,
  addUserToDB: userDataController.addUserToDB,
  listUsers: userDataController.listUsers,
  // Add other exports as needed...
};
