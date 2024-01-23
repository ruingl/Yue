const axios = require("axios");

module.exports = {
  config: {
    name: "teach",
    description: "Teach SimSimi a response.",
    usage: ":teach [message] [answer]",
    author: "Rui",
  },

  run: async ({ api, event, args }) => {
    const message = args[0]; // Extract message text from command arguments
    const answer = args.slice(1).join(" "); // Extract answer text from command arguments

    if (!message || !answer) {
      api.sendMessage(
        "Invalid command usage. Correct format: `:teach [message] [answer]`",
        event.threadID,
        event.messageID,
      );
      return;
    }

    try {
      const response = await axios.get(
        `https://simsimi.fun/api/v2/?mode=teach&lang=en&message=${message}&answer=${answer}`,
      );
      const teachResponse = response.data.success
        ? "Teaching successful!"
        : "Failed to teach SimSimi.";
      api.sendMessage(teachResponse, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage(
        "An error occurred while teaching SimSimi.",
        event.threadID,
        event.messageID,
      );
    }
  },
};
