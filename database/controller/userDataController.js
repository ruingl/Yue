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
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info from the database:", error);
    return null;
  }
};

const addUserToDB = async (api, userID) => {
  try {
    // Use api.getUserInfo to get user information
    const userInfo = await api.getUserInfo([userID]);

    if (userInfo && userInfo[userID]) {
      const user = userInfo[userID];

      await UserModel.create({
        userID: user.userID,
        name: user.name,
        vanity: user.vanity,
        banned: false,
        settings: {},
        data: {},
        // Additional fields from API call
        gender: user.gender,
        isFriend: user.isFriend,
        isBirthday: user.isBirthday,
        searchTokens: user.searchTokens,
        imgavt: user.thumbSrc, // Use thumbSrc from getUserInfo for profile picture
      });

      console.log(chalk.green(`[ DATABASE ] : Added new user: ${userID}`));
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error adding user to the database:", error);
  }
};

const listUsers = async () => {
  try {
    const users = await UserModel.findAll();
    return users.map((user) => ({
      userID: user.userID,
      name: user.name,
      vanity: user.vanity,
    }));
  } catch (error) {
    console.error("Error listing users:", error);
    return null;
  }
};

module.exports = {
  getUserInfoFromDB,
  addUserToDB,
  listUsers,
  // Add other exports as needed...
};
