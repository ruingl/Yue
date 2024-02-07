module.exports = {
  config: {
    name: "tid",
    description: "Get the current Thread ID.",
    usage: ":tid",
    author: "Rui",
    version: "1.0.0",
    role: 0, // Adjusted to role 0
  },
  run: ({ api, event }) => {
    const threadID = event.threadID;
    api.sendMessage(`Current Thread ID: ${threadID}`, event.threadID);
  },
};
