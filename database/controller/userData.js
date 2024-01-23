// userData.js

const userDataController = require("./userDataController");

module.exports = {
  getUserInfoFromDB: userDataController.getUserInfoFromDB,
  addUserToDB: userDataController.addUserToDB,
  listUsers: userDataController.listUsers,
  // Add other exports as needed...
};
