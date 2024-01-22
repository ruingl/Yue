/*
    @author: Rui
    @message MADE BY RUI
    @version: 1.0.0
    @date: IDK
*/

const fs = require("fs");
const path = require("path");
const login = require("fca-unofficial");
const axios = require("axios");
const express = require("express");
const chalk = require('chalk');

const PREFIX = ":";
const app = express();
const commandPath = path.join(__dirname, "scripts", "commands");

const commands = {};

function loadCommands() {
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));

    commandFiles.forEach(file => {
        const commandName = path.basename(file, ".js");
        commands[commandName] = require(path.join(commandPath, file));
    });
}

loadCommands();

fs.watch(commandPath, (eventType, filename) => {
    if (eventType === "change" && filename.endsWith(".js")) {
        const commandName = path.basename(filename, ".js");
        delete require.cache[require.resolve(path.join(commandPath, filename))];
        commands[commandName] = require(path.join(commandPath, filename));
        console.log(`AutoReload: ${commandName} reloaded ✅`);
    }
});

login({ appState: loadAppState() }, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, event) => {
        if (err) {
            console.error("Error occurred while processing event:", err);
            return;
        }
// Liane : new func add
        const react = (emoji) => {
  api.setMessageReaction(emoji, event.messageID, () => {}, true);
};

const reply = (msg) => {
  api.sendMessage(msg, event.threadID, event.messageID);
};

const add = (uid) => {
  api.addUserToGroup(uid, event.threadID);
};

const kick = (uid) => {
  api.removeUserFromGroup(uid, event.threadID);
};

const send = (msg) => {
  api.sendMessage(msg, event.threadID);
};

const box = {
  react: react,
  reply: reply,
  add: add,
  kick: kick,
  send: send
};

        try {
            if (event.body && event.body.toLowerCase() === "prefix") {
                api.sendMessage(`My prefix is: \`${PREFIX}\``, event.threadID, event.messageID);
            } else if (event.body && event.body.toLowerCase().startsWith(PREFIX)) {
                const [command, ...args] = event.body.slice(PREFIX.length).trim().split(" ");

                if (commands[command]) {
                    commands[command].run({ api, event, args, box });
                } else {
                    api.sendMessage("Invalid command.", event.threadID, event.messageID);
                }
            }
        } catch (error) {
            console.error("Error occurred while executing command:", error);
            // Handle the error or log it to your preferred logging service
        }
    });
});

function loadAppState() {
    try {
        const appStatePath = path.join(__dirname, "appstate.json");
        return JSON.parse(fs.readFileSync(appStatePath, "utf8"));
    } catch (error) {
        console.error("Error loading app state:", error);
        return null;
    }
}

app.get("/", (req, res) => {
    // Handle requests for the Home page
    res.send("Website in construction 🏗️");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(chalk.grey("yuev1 - (1.0.0)"))
    console.log(chalk.green("[fca]: Logging in"));
    console.log(chalk.green("[express]: Open on PORT 3000"));
    console.log("");
});

module.exports = {
    author: "Rui"
};
