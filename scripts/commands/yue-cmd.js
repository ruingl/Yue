const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "yue-cmd",
    description: "Install a new command.",
    usage: ":yue-cmd install {code or Pastebin URL} {commandName}.js",
    role: 1,
    author: "Rui",
    license: "ISC"
  },

  run: async function ({ api, event, args }) {
    if (args.length < 4 || args[0] !== "install") {
      api.sendMessage("Invalid command usage. Please use ':yue-cmd install {code or Pastebin URL} {commandName}.js'.", event.threadID);
      return;
    }

    const [, , codeOrUrl, commandFileName] = args.slice(0, 4);
    let code;

    if (codeOrUrl.startsWith("http")) {
      try {
        const response = await axios.get(codeOrUrl);
        code = response.data;
      } catch (error) {
        console.error(error);
        api.sendMessage("Error fetching code from the provided URL.", event.threadID);
        return;
      }
    } else {
      code = codeOrUrl;
    }

    const commandPath = `${commandFileName}.js`;
    try {
      fs.writeFileSync(commandPath, code);
      api.sendMessage(`Command '${commandFileName}' has been installed successfully!`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("Error installing the command.", event.threadID);
    }
  },
};
