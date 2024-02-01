// userDataController.js

const UserModel = require("../models/userModel");
const chalk = require("chalk");

const getUserInfoFromDB = async (userID) => {
  try {
    // Fetch user information from the database
    const user = await UserModel.findByPk(userID);

    if (user) {
      console.log(
        chalk.green(`[ DATABASE ] : Fetched user info from DB: ${userID}`),
      );
      return user.toJSON(); // Convert to plain object for better handling
    } else {
      console.log(
        chalk.yellow(`[ DATABASE ] : User not found in DB: ${userID}`),
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info from the database:", error);
    return null;
  }
};

const addUserToDB = async (api, userID) => {
  try {
    const userInfo = await api.getUserInfo([userID]); // Pass userID as an array
    const user = userInfo[userID];

    if (user) {
      const vanity = user.vanity;
      const name = user.name;

      await UserModel.create({
        userID: userID,
        name: name,
        vanity: vanity,
        banned: false,
        settings: {},
        data: {},
      });

      console.log(chalk.green(`[ DATABASE ] : Added new user: ${userID}`));
    } else {
      console.log(chalk.yellow(`[ DATABASE ] : User not found: ${userID}`));
    }
  } catch (error) {
    console.error("Error adding user to the database:", error);
  }
};

const listUsers = async () => {
  try {
    const users = await UserModel.findAll();
    console.log("[ DATABASE ] : List of users:");
    users.forEach((user) => {
      console.log(
        `User ID: ${user.userID}, Name: ${user.name}, Vanity: ${user.vanity}`,
      );
    });
  } catch (error) {
    console.error("Error listing users:", error);
  }
};

// Other controller functions go here...

module.exports = {
  getUserInfoFromDB,
  addUserToDB,
  listUsers,
  // Add other exports as needed...
};
