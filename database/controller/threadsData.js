const threadsDataController = require("./threadsDataController");

module.exports = {
  getThreadInfoFromDB: threadsDataController.getThreadInfoFromDB,
  addThreadToDB: threadsDataController.addThreadToDB,
  // Add other exports as needed...
};
