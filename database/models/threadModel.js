const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connectDB/connectDB");

class ThreadModel extends Model {}

ThreadModel.init(
  {
    threadID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    threadName: DataTypes.STRING,
    threadThemeID: DataTypes.STRING,
    emoji: DataTypes.STRING,
    adminIDs: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    imageSrc: DataTypes.STRING,
    approvalMode: DataTypes.BOOLEAN,
    members: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
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
    isGroup: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "thread",
  }
);

module.exports = ThreadModel;