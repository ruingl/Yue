function addUser(uid) {
  api.addUserToGroup(uid, event.threadID);
}

function kickUser(uid) {
  api.removeUserFromGroup(uid, event.threadID);
}

function send(msg) {
  api.sendMessage(msg, event.threadID);
}

function react(emoji) {
  api.setMessageReaction(emoji, event.messageID, () => {}, true);
}

module.exports = {
  config: {
    name: "adduser",
    description: "Adds a user to a thread by UID",
    usage: ":adduser <uid>",
    author: "LiANE",
  },
  run: ({ api, event }) => {
    const { body } = event;
    const [cmd, uid] = body.split(" ");
    try {
      api.addUserToGroup(uid, event.threadID);
    } catch (err) {
      api.sendMessage(
        `An error occurred while adding the participant.`,
        event.threadID,
      );
    }
  },
};
