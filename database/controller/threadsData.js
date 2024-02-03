const threadsDataController = require("./threadsDataController");

module.exports = {
  getThreadInfoFromDB: threadsDataController.getThreadInfoFromDB,
  addThreadToDB: threadsDataController.addThreadToDB,
  listThreads: threadsDataController.listThreads,
};
