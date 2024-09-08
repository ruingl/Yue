const { promisify } = require("util");

module.exports = async (api, event) => {
  const onEvent = require("./functions/onEvent");
  const onRun = require("./functions/onRun");

  const sendMessage = promisify(api.sendMessage).bind(api);
  const editMessage = promisify(api.editMessage).bind(api);
  const unsendMessage = promisify(api.unsendMessage).bind(api);
  const setMessageReaction = promisify(api.setMessageReaction).bind(api);
  const box = new Object({
    async send(msg) {
      const info = await api.sendMessage(msg, event.threadID);
      return info;
    },
    async reply(msg) {
      const info = await api.sendMessage(msg, event.threadID, event.messageID);
      return info;
    },
    async edit(msg, mid) {
      const info = await api.editMessage(msg, mid);
      return info;
    },
    async unsend(mid) {
      const info = await api.unsendMessage(mid);
      return info;
    },
    async react(emoji) {
      const info = await api.setMessageReaction(emoji, event.messageID);
      return info;
    },
  });

  const runObj = { api, event, box };
  switch (event.type) {
    case "message":
      await onRun(runObj);
      break;
    case "event":
      await onEvent(runObj);
      break;
  }
};
