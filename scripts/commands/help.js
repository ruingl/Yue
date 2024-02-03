const fs = require("fs");
const path = require("path");

const commandsPerPage = 10;

module.exports = {
  config: {
    name: "help",
    description: "Shows a list of available commands.",
    usage: ":help [command/page]",
    author: "Rui and Lia", // + liaaa
  },
  run: ({ api, event }) => {
    const { body } = event;
    const [cmd, ...args] = body.split(" ");

    const commandFiles = fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith(".js") && file !== "help.js");

    const sendMessage = (message) => api.sendMessage(message, event.threadID, event.messageID);

    switch (true) {
      case args.length === 0:
        let helpMessage = `📍 | 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 (Page 1/${Math.ceil(commandFiles.length / commandsPerPage)}):\n`;

        commandFiles.slice(0, commandsPerPage).forEach((file) => {
          const commandName = path.basename(file, ".js");
          const command = require(`./${commandName}`);
          const { name, description } = command.config;
          helpMessage += `➤ 【 ${name || " No Name"} 】- ${description || "No description"}\n`;
        });

        sendMessage(helpMessage);
        break;

      case !isNaN(args[0]):
        const pageNumber = parseInt(args[0], 10);
        if (pageNumber <= 0) {
          sendMessage("Invalid page number.");
          return;
        }

        const startIndex = (pageNumber - 1) * commandsPerPage;
        const endIndex = pageNumber * commandsPerPage;

        if (startIndex >= commandFiles.length) {
          sendMessage(`No commands on page ${pageNumber}.`);
          return;
        }

        let pageMessage = `📍 | 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 (Page ${pageNumber}/${Math.ceil(commandFiles.length / commandsPerPage)}):\n`;

        commandFiles.slice(startIndex, endIndex).forEach((file) => {
          const commandName = path.basename(file, ".js");
          const command = require(`./${commandName}`);
          const { name, description } = command.config;
          pageMessage += `➤ 【 ${name || " No Name"} 】- ${description || "No description"}\n`;
        });

        sendMessage(pageMessage);
        break;

      default:
        const commandName = args.join(" ").toLowerCase();
        const commandFile = commandFiles.find((file) => path.basename(file, ".js").toLowerCase() === commandName);

        if (commandFile) {
          const command = require(`./${path.basename(commandFile, ".js")}`);
          const { name, description, usage, author, version } = command.config;
          sendMessage(
            `➤【 ${name || "Guide:"} 】
📝 Created by: ${author || "Anonymous"}
💻 Version: ${version || "1.0"}
🔎 Description:
${description || "Its a mystery"}
💡 Usage: 
${usage || "Guess it"}`,
          );
        } else {
          sendMessage(`Command or page not found: ${args.join(" ")}`);
        }
        break;
    }
  },
};