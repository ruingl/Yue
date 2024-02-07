// yue.js

const fs = require("fs");
const path = require("path");
const login = require("fb-chat-api-temp");
const axios = require("axios");
const express = require("express");
const chalk = require("chalk");
const gradient = require("gradient-string");
const {
  addUserToDB,
  getThreadInfoFromDB,
  getUserInfoFromDB,
  addThreadToDB,
} = require("./database/commands/index");

const app = express();
const commandPath = path.join(__dirname, "scripts", "commands");
const PREFIX = ":";
const PORT = process.env.PORT || 3000;

const commands = {};

// Load the version from version.json
const versionPath = path.join(__dirname, "version.json");
let version = loadVersion();

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
    const loadingLog = gradient.rainbow(
      `Loaded ${commandName}.js (${duration}ms)`,
    );
    console.log(loadingLog);
  });
}

function loadVersion() {
  try {
    return JSON.parse(fs.readFileSync(versionPath, "utf8")).version;
  } catch (error) {
    console.error("Error loading version:", error);
    return null;
  }
}

// Assuming this is where you create the API instance
function initializeBot() {
  login({ appState: loadAppState() }, (err, api) => {
    if (err) return console.error(err);

    api.setOptions({
      listenEvents: true,
      logLevel: "silent",
    });

    // Additional global variables
    const fbstate = api.getAppState();

    global.client = {};
    global.data = {};
    global.account = {
      cookie: fbstate.map((i) => (i = i.key + "=" + i.value)).join(";"),
    };

    // Check for updates
    updateCheck();

    fs.writeFileSync("appstate.json", JSON.stringify(api.getAppState()));

    // Set global variables
    global.client = {};
    global.data = {};
    global.account = {
      cookie: fbstate.map((i) => (i = i.key + "=" + i.value)).join(";"),
    };

    api.listen(async (err, event) => {
      if (err) {
        console.error("Error occurred while processing event:", err);
        return;
      }

      const userExists = await getUserInfoFromDB(event.senderID);

      if (!userExists) {
        // Use the addUserToDB command to add the user to the database
        addUserToDB(api, event.senderID);
      }

      const threadExists = await getThreadInfoFromDB(event.threadID);

      if (!threadExists) {
        // Manually add the thread information to the database
        await addThreadToDB(api, event.threadID);
      }

      const box = {
        react: (emoji) => {
          api.setMessageReaction(emoji, event.messageID, () => {}, true);
        },
        reply: (msg) => {
          api.sendMessage(msg, event.threadID, event.messageID);
        },
        add: (uid) => {
          api.addUserToGroup(uid, event.threadID);
        },
        kick: (uid) => {
          api.removeUserFromGroup(uid, event.threadID);
        },
        send: (msg) => {
          api.sendMessage(msg, event.threadID);
        },
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
            api.sendMessage(
              "Invalid command.",
              event.threadID,
              event.messageID,
            );
          }
        }
      } catch (error) {
        console.error("Error occurred while executing command:", error);
        // Handle the error or log it to your preferred logging service
      }
    });
  });
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

function updateCheck() {
  axios
    .get("https://api.github.com/repos/ruingl/Yue/releases/latest")
    .then((response) => {
      const latestVersion = response.data.tag_name;
      if (latestVersion && latestVersion !== version) {
        console.log(
          gradient.retro(
            `⟩ New version found! Update to ${latestVersion} using npm run update`,
          ),
        );
      }
    })
    .catch((error) => {
      console.error("Error checking for updates:", error);
    });
}

// Initialize the bot
initializeBot();

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Website in Construction 🏗️</title>
      <!-- Include Bootstrap CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
        }

        .construction-container {
          text-align: center;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .construction-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .construction-text {
          font-size: 18px;
          color: #555;
        }

        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="construction-container">
        <div class="construction-icon">🏗️</div>
        <div class="construction-text">Website in Construction</div>
        <div class="footer">© Copyright 2024 ruingl.</div>
      </div>

      <!-- Include Bootstrap JS (optional, for Bootstrap features) -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(gradient.retro(`⟩ yuev1 - (${version}) 🙀`));

  // Additional logging for 'by ruingl'
  console.log(gradient.retro("⟩ by ruingl ♥️"));

  // ... (rest of your logging)
  console.log("");

  // Log the loaded commands
  console.log(gradient.rainbow("Loaded Commands:"));
  loadCommands();

  // Additional console.log(""); for separation
  console.log("");
});
