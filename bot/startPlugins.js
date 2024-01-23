// bot/startPlugins.js

const fs = require("fs");
const path = require("path");

const pluginsPath = path.join(__dirname, "plugins");

function startPlugins() {
  const pluginFolders = fs.readdirSync(pluginsPath);

  pluginFolders.forEach((folder) => {
    const pluginPath = path.join(pluginsPath, folder);
    const loadPluginPath = path.join(pluginPath, "scripts", "loadPlugin.js");
    const handlePluginPath = path.join(
      pluginPath,
      "scripts",
      "handlePlugin.js",
    );

    try {
      const loadPlugin = require(loadPluginPath);
      const handlePlugin = require(handlePluginPath);

      // Assuming these functions exist in your scripts
      if (loadPlugin.load && handlePlugin.handle) {
        loadPlugin.load();
        handlePlugin.handle({
          target: {}, // Pass the necessary target object
          commandName: "exampleCommand", // Pass any required parameters
          commands: [], // Pass any required parameters
          approve: () => {}, // Pass any required parameters
          reject: () => {}, // Pass any required parameters
        });
      } else {
        console.error(`Error: ${folder} does not have required functions.`);
      }
    } catch (error) {
      console.error(`Error loading or executing ${folder} plugin: ${error}`);
    }
  });
}

module.exports = startPlugins;
