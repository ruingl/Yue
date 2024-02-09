module.exports = {
  config: {
    name: "uid",
    description: "Get your User ID.",
    usage: ":uid",
    author: "Rui",
    version: "1.0.0",
    role: 0, // Adjusted to role 0
  },
  run: ({ api, event }) => {
    const userID = event.senderID;
    api.sendMessage(`Your User ID: ${userID}`, event.threadID);
  },
};
