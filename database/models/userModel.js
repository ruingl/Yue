const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connectDB/connectDB");

class UserModel extends Model {}

UserModel.init(
  {
    userID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    vanity: DataTypes.STRING,
    banned: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    settings: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    data: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    // Additional fields from API call using api.getUserInfo
    thumbSrc: DataTypes.STRING,
    profileUrl: DataTypes.STRING,
    gender: DataTypes.STRING,
    type: DataTypes.STRING,
    isFriend: DataTypes.BOOLEAN,
    isBirthday: DataTypes.BOOLEAN,
    searchTokens: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "user",
  },
);

module.exports = UserModel;
