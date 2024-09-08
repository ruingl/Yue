// uid.js

module.exports = {
  config: {
    name: "uid",
    description: "Get your User ID.",
    usage: ":uid",
    author: "Rui",
    version: "1.0.0",
    role: 0, // Adjusted to role 0
  },
  run: ({ api, event, box }) => {
    const targetID = event.messageReply
      ? event.messageReply.senderID
      : event.senderID;
    box.reply(targetID);
  },
};
