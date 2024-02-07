const ThreadModel = require("../models/threadModel");
const chalk = require("chalk");

const getThreadInfoFromDB = async (threadID) => {
  try {
    const thread = await ThreadModel.findByPk(threadID);
    return thread ? thread.toJSON().threadInfo : null;
  } catch (error) {
    console.error("Error getting thread info from the database:", error);
    return null;
  }
};

const addThreadToDB = async (api, threadID) => {
  try {
    const threadInfo = await api.getThreadInfo(threadID);

    if (Array.isArray(threadInfo)) {
      // Handle batch query response
      threadInfo.forEach(async (info) => {
        await processThread(api, info);
      });
    } else {
      // Handle single thread query response
      const addedThread = await processThread(api, threadInfo);
      if (addedThread) {
        console.log(
          chalk.green(`[ DATABASE ] : Added new thread: ${threadID}`),
        );
      }
    }
  } catch (error) {
    console.error("Error adding thread to the database:", error);
  }
};

const processThread = async (api, threadInfo) => {
  try {
    const defaultThreadName = "Default Thread Name";

    // Skip adding default threads to the database
    if (
      !threadInfo ||
      !threadInfo.threadName ||
      threadInfo.threadName === defaultThreadName
    ) {
      return;
    }

    const threadData = {
      threadID: threadInfo.threadID,
      threadInfo: {
        threadID: threadInfo.threadID,
        threadName: threadInfo.threadName || defaultThreadName,
        participantIDs: threadInfo.participantIDs || [],
        userInfo: threadInfo.userInfo || [],
        nicknames: threadInfo.nicknames || null,
        unreadCount: threadInfo.unreadCount || 0,
        messageCount: threadInfo.messageCount || 0,
        imageSrc: threadInfo.imageSrc || null,
        timestamp: threadInfo.timestamp || 0,
        muteUntil: threadInfo.muteUntil || null,
        isGroup: threadInfo.isGroup || false,
        isSubscribed: threadInfo.isSubscribed || null,
        folder: threadInfo.folder || null,
        isArchived: threadInfo.isArchived || false,
        cannotReplyReason: threadInfo.cannotReplyReason || null,
        lastReadTimestamp: threadInfo.lastReadTimestamp || 0,
        emoji: threadInfo.emoji || null,
        color: threadInfo.color || null,
        adminIDs: threadInfo.adminIDs || [],
        approvalMode: threadInfo.approvalMode || false,
        approvalQueue: threadInfo.approvalQueue || [],
        inviteLink: threadInfo.inviteLink || { enable: false, link: null },
        accountType: threadInfo.accountType || null,
        // ... add other fields as needed
      },
      settings: "{}",
      data: "{}",
    };

    await ThreadModel.create(threadData);
  } catch (error) {
    //console.error("Error processing thread:", error);

    return null;
  }
};

const listThreads = async () => {
  try {
    const threads = await ThreadModel.findAll();

    if (threads.length > 0) {
      console.log(chalk.green("[ DATABASE ] : List of Threads:"));
      threads.forEach((thread) => {
        console.log(
          `- Thread ID: ${thread.threadID}, Name: ${thread.threadInfo.threadName}`,
        );
      });
    } else {
      console.log(
        chalk.yellow("[ DATABASE ] : No threads found in the database."),
      );
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
