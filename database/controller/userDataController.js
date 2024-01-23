// userDataController.js

const UserModel = require("../models/userModel");

const getUserInfo = async (userID) => {
  try {
    const user = await UserModel.findByPk(userID);
    return user ? user.toJSON() : null;
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};

const addUserToDB = async (api, userID) => {
  try {
    const userInfo = await api.getUserInfo(userID);
    const vanity = userInfo[userID].vanity;
    const name = userInfo[userID].name;

    await UserModel.create({
      userID: userID,
      name: name,
      vanity: vanity,
      banned: false,
      settings: {},
      data: {},
    });

    console.log(chalk.green(`[ DATABASE ] : Added new user: ${userID}`));
  } catch (error) {
    console.error("Error adding user to the database:", error);
  }
};

const listUsers = async () => {
  try {
    const users = await UserModel.findAll();
    console.log("[ DATABASE ] : List of users:");
    users.forEach((user) => {
      console.log(`User ID: ${user.userID}, Name: ${user.name}, Vanity: ${user.vanity}`);
    });
  } catch (error) {
    console.error("Error listing users:", error);
  }
};

// Other controller functions go here...

module.exports = {
  getUserInfo,
  addUserToDB,
  listUsers,
  // Add other exports as needed...
};