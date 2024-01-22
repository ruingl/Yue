const fs = require("fs");
const path = require("path");
const login = require("fca-unofficial");
const axios = require("axios");
const express = require("express");
const chalk = require("chalk");
const gradient = require("gradient-string");

const app = express();
const commandPath = path.join(__dirname, "scripts", "commands");
const PREFIX = ":"
const PORT = process.env.PORT || 3000;

const commands = {};

// Load the version from version.json
const versionPath = path.join(__dirname, "version.json");
let version = loadVersion();

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    console.error("Error loading config:", error);
    return null;
  }
}

function loadAppState() {
  try {
    const appStatePath = path.join(__dirname, "appstate.json");
    return JSON.parse(fs.readFileSync(appStatePath, "utf8"));
  } catch (error) {
    console.error("Error loading app state:", error);
    return null;
  }
}

function saveConfig() {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

function loadVersion() {
  try {
    return JSON.parse(fs.readFileSync(versionPath, "utf8")).version;
  } catch (error) {
    console.error("Error loading version:", error);
    return null;
  }
}

function saveVersion() {
  fs.writeFileSync(versionPath, JSON.stringify({ version }, null, 2));
}

function loadCommands() {
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((file) => {
    const startTime = new Date();
    const commandName = path.basename(file, ".js");
    commands[commandName] = require(path.join(commandPath, file));
    const endTime = new Date();

    // Loading commands logger
    const duration = endTime - startTime;
    const loadingLog = gradient.rainbow(`Loaded ${commandName}.js (${duration}ms)`);
    console.log(loadingLog);
  });
}

function initializeBot() {
  login({ appState: loadAppState() }, (err, api) => {
    if (err) return console.error(err);

    // Get the app state and write it to 'appstate.json'
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

    api.listen((err, event) => {
      if (err) {
        console.error("Error occurred while processing event:", err);
        return;
      }

      // Liane: new functions added
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
        send: send,
      };

      try {
        if (event.body && event.body.toLowerCase() === "prefix") {
          api.sendMessage(
            `My prefix is: \`${PREFIX}\``,
            event.threadID,
            event.messageID,
          );
        } else if (event.body && event.body.toLowerCase().startsWith(PREFIX)) {
          const [command, ...args] = event.body
            .slice(PREFIX.length)
            .trim()
            .split(" ");

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
}

function updateCheck() {
  axios.get("https://api.github.com/repos/ruingl/Yue/releases/latest")
    .then((response) => {
      const latestVersion = response.data.tag_name;
      if (latestVersion && latestVersion !== version) {
        console.log(gradient.retro(`⟩ New version found! Update to ${latestVersion} using npm run update`));
      }
    })
    .catch((error) => {
      console.error("Error checking for updates:", error);
    });
}

app.get("/", (req, res) => {
  res.send("Website in construction 🏗️");
});

app.listen(PORT, async () => {
  console.log(gradient.retro(`⟩ yuev1 - (${version}) 🙀`));

  // Additional logging for 'by ruingl'
  console.log(gradient.retro("⟩ by ruingl ♥️"));

  // Check for updates
  await updateCheck();

  // ... (rest of your logging)
  console.log("");

  // Log the loaded commands
  console.log(gradient.rainbow("Loaded Commands:"));
  loadCommands();

  // Additional console.log(""); for separation
  console.log("");

  // Initialize the bot
  initializeBot();
});