const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connectDB/connectDB");

class ThreadModel extends Model {}

ThreadModel.init(
  {
    threadID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    threadInfo: {
      type: DataTypes.JSON,
      defaultValue: {
        threadID: "",
        threadName: "Default Thread Name",
        participantIDs: [],
        userInfo: [],
        unreadCount: 0,
        messageCount: 0,
        timestamp: 0,
        muteUntil: null,
        isGroup: false,
        isArchived: false,
        emoji: null,
        color: null,
        adminIDs: [],
        approvalMode: false,
        approvalQueue: [],
        inviteLink: { enable: false, link: null },
      },
    },
    settings: {
      type: DataTypes.JSON,
      defaultValue: "{}",
    },
    data: {
      type: DataTypes.JSON,
      defaultValue: "{}",
    },
  },
  {
    sequelize,
    modelName: "thread",
  },
);

module.exports = ThreadModel;
