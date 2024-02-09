const { listThreads } = require("../../database/commands/index");

module.exports = {
  config: {
    name: "threads",
    description: "List all threads stored in the database.",
    usage: ":threads",
    author: "Rui",
    version: "1.0.0",
    role: 1, // Assuming role 1 means admin, adjust as needed
  },
  run: async ({ api, event }) => {
    try {
      // Use the listThreads function to retrieve information about threads in the database
      const threadsInfo = await listThreads();

      if (threadsInfo && threadsInfo.length > 0) {
        const message = threadsInfo
          .map((thread) => `- Thread ID: ${thread.threadID}, Name: ${thread.threadName}`)
          .join("\n");
        api.sendMessage(
          `[ DATABASE ] : List of Threads:\n${message}`,
          event.threadID,
        );
      } else {
        api.sendMessage(
          "[ DATABASE ] : No threads found in the database.",
          event.threadID,
        );
      }
    } catch (error) {
      console.error("Error in the threads command:", error);
      api.sendMessage(
        "[ DATABASE ] : Error listing threads from the database.",
        event.threadID,
      );
    }
  },
};
