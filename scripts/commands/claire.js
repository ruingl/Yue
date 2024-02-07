const axios = require("axios");

module.exports = {
  config: {
    name: "claire",
    description: "Ask Claire a question.",
    usage: "{p}claire <question>",
    role: 0, // 0 - Everyone, 1 - Admin
    author: "Rui | Liane",
  },
  run: async ({ api, event, args, box }) => {
    const question = args.join(" ");

    if (!question) {
      box.reply(
        "Please provide a question after the command using the query parameter.",
      );
      return;
    }

    try {
      const apiKey = "j86bwkwo-8hako-12C";
      const response = await axios.get(
        `https://lianeapi.onrender.com/@LianeAPI_Reworks/api/claire?key=${apiKey}&query=${encodeURIComponent(
          question,
        )}`,
      );
      const message = response.data.message;

      box.reply(message, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error asking Claire:", error.message);
      box.reply("An error occurred while asking Claire.");
    }
  },
};
