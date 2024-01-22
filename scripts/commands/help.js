const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "help",
    description: "Shows a list of available commands.",
    usage: ":help",
    author: "Rui and Lia", // + liaaa
  },
  run: ({ api, event }) => {
    const { body } = event;
    const [cmd, cmdName] = body.split(" ");

    if (!cmdName) {
      const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".js") && file !== "help.js");

      let helpMessage = `📍 | 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀:\n
`;
      commandFiles.forEach(file => {
        const commandName = path.basename(file, ".js");
        const command = require(`./${commandName}`);
        const { name, description } = command.config;
        helpMessage += `➤ 【 ${name || " No Name"} 】- ${description || "No description"}
`;
      });

      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const reqCmd = require(`./${cmdName}.js`);
      const { name, description, usage, author, version } = reqCmd.config;
      api.sendMessage(`➤【 ${name || "Guide:"} 】
📝 Created by: ${author || "Anonymous"}
💻 Version: ${version || "1.0"}
🔎 Description:
${description || "Its a mystery"}
💡 Usage: 
${usage || "Guess it"}`, event.threadID);
    }
  }
};