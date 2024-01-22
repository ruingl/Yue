module.exports = {
  config: {
    name: "hello",
    description: "Greet the user with 'Hello, World!'",
    author: "Rui",
    usage: ":hello",
    license: "ISC",
  },

  run: (context) => {
    const { api, event } = context;

    // Check if both threadID and messageID properties are available in the event object
    if (event.threadID && event.messageID) {
      api.sendMessage("Hello, World!", event.threadID, event.messageID);
    } else {
      console.error(
        "Invalid event object. Missing threadID or messageID properties.",
      );
    }
  },
};
