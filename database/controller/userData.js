// userData.js

const userDataController = require("./userDataController");

module.exports = {
  getUserInfo: userDataController.getUserInfo,
  addUserToDB: userDataController.addUserToDB,
  listUsers: userDataController.listUsers,
  // Add other exports as needed...
};
