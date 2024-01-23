const ThreadModel = require("../models/threadModel");
const chalk = require("chalk");

const getThreadInfoFromDB = async (threadID) => {
  try {
    const thread = await ThreadModel.findByPk(threadID);
    return thread ? thread.toJSON() : null;
  } catch (error) {
    console.error("Error getting thread info from the database:", error);
    return null;
  }
};

const addThreadToDB = async (api, threadID) => {
  try {
    const threadInfo = await api.getThreadInfo(threadID);

    await ThreadModel.create({
      threadID: threadID,
      threadName: threadInfo.threadName || "Default Thread Name",
      threadThemeID: threadInfo.threadThemeID || "Default Theme ID",
      emoji: threadInfo.emoji || "",
      adminIDs: JSON.stringify(threadInfo.adminIDs || []),
      imageSrc: threadInfo.imageSrc || "",
      approvalMode: threadInfo.approvalMode || false,
      members: JSON.stringify(threadInfo.participantIDs || []),
      banned: false, // You may need to update this based on your logic
      settings: "{}",
      data: "{}",
      isGroup: threadInfo.isGroup || false,
    });

    console.log(chalk.green(`[ DATABASE ] : Added new thread: ${threadID}`));
  } catch (error) {
    console.error("Error adding thread to the database:", error);
  }
};

// Other controller functions go here...

module.exports = {
  getThreadInfoFromDB,
  addThreadToDB,
  // Add other exports as needed...
};
