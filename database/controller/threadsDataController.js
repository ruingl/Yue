const ThreadModel = require("../models/threadModel");

const getThreadInfo = async (threadID) => {
  try {
    const thread = await ThreadModel.findByPk(threadID);
    return thread ? thread.toJSON() : null;
  } catch (error) {
    console.error("Error getting thread info:", error);
    return null;
  }
};

// Other controller functions go here...

module.exports = {
  getThreadInfo,
  // Add other exports as needed...
};