const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    description: "Interact with an AI to get responses to your questions.",
    usage: ":ai <question>",
    author: "Rui",
  },

  run: async (context) => {
    const { api, event } = context;
    const args = event.body.slice(":ai".length).trim(); // Extract the arguments after ":ai"

    // Check if there are any arguments
    if (args) {
      try {
        const response = await axios.get(
          `https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(
            args,
          )}`,
        );
        const aiResponse = response.data.reply;
        api.sendMessage(aiResponse, event.threadID, event.messageID);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        api.sendMessage(
          "Failed to get AI response. Please try again later.",
          event.threadID,
          event.messageID,
        );
      }
    } else {
      api.sendMessage(
        "Please provide a question after the command. For example: `:ai Hello`",
        event.threadID,
        event.messageID,
      );
    }
  },
};
