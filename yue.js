const fs = require("fs");
const path = require("path");
const login = require("fca-unofficial");
const axios = require("axios");
const express = require("express");

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

        try {
            if (event.body && event.body.toLowerCase() === "prefix") {
                api.sendMessage(`My prefix is: \`${PREFIX}\``, event.threadID, event.messageID);
            } else if (event.body && event.body.toLowerCase().startsWith(PREFIX)) {
                const [command, ...args] = event.body.slice(PREFIX.length).trim().split(" ");

                if (commands[command]) {
                    commands[command].run({ api, event, args });
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
    res.send("Yue is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {
    author: "Rui"
};
