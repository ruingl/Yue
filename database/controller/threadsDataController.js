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

const listThreads = async () => {
  try {
    const threads = await ThreadModel.findAll();

    if (threads.length > 0) {
      console.log(chalk.green("[ DATABASE ] : List of Threads:"));
      threads.forEach((thread) => {
        console.log(`- Thread ID: ${thread.threadID}, Name: ${thread.threadName}`);
      });
    } else {
      console.log(chalk.yellow("[ DATABASE ] : No threads found in the database."));
    }
  } catch (error) {
    console.error("Error listing threads from the database:", error);
  }
};

// Placeholder for additional controller functions...

module.exports = {
  getThreadInfoFromDB,
  addThreadToDB,
  listThreads,
  // Add other exports as needed...
};