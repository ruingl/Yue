const fs = require("fs");
const path = require("path");
const login = require("fca-unofficial");
const axios = require("axios");

const PREFIX = ":";

login({ appState: loadAppState() }, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, event) => {
        if (err) return console.error(err);

        if (event.body && event.body.toLowerCase() === "prefix") {
            api.sendMessage(`My prefix is: \`${PREFIX}\``, event.threadID, event.messageID);
        } else if (event.body && event.body.toLowerCase().startsWith(PREFIX)) {
            const [command, ...args] = event.body.slice(PREFIX.length).trim().split(" ");
            const commandPath = path.join(__dirname, "scripts", "commands", `${command}.js`);

            if (fs.existsSync(commandPath)) {
                require(commandPath).run({ api, event, args });
            } else {
                api.sendMessage("Invalid command.", event.threadID, event.messageID);
            }
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
