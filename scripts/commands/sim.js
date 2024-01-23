const axios = require("axios");

module.exports = {
  config: {
    name: "sim",
    description: "Talk to SimSimi.",
    usage: ":sim [message]",
    author: "Rui",
  },

  run: async ({ api, event, args }) => {
    const message = args.join(" "); // Extract message text from command arguments

    if (!message) {
      api.sendMessage(
        "Invalid command usage. Correct format: `:sim [message]`",
        event.threadID,
        event.messageID,
      );
      return;
    }

    try {
      const response = await axios.get(
        `https://simsimi.fun/api/v2/?mode=talk&lang=en&message=${message}&filter=true`,
      );
      const simResponse = response.data.success
        ? response.data.success
        : "Sorry, I couldn't understand that.";
      api.sendMessage(simResponse, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage(
        "An error occurred while talking to SimSimi.",
        event.threadID,
        event.messageID,
      );
    }
  },
};
