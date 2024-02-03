const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports = {
  config: {
    name: "hercai",
    description: "Interact with Hercai AI.",
    usage: ":hercai <your_question>",
    author: "Rui | Bes-js",
    version: "1.0.0",
  },
  run: async ({ api, event, args }) => {
    try {
      const query = args.join(" ");

      if (!query) {
        api.sendMessage("No query detected.", event.threadID);
      } else {
        const response = await herc.question({
          model: "v3",
          content: query,
        });

        api.sendMessage(response.reply, event.threadID);
      }
    } catch (error) {
      console.error("Hercai command error:", error.message);
    }
  },
};
