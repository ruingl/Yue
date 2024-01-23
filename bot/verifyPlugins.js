const fs = require("fs");
const path = require("path");

const pluginsPath = path.join(__dirname, "plugins");

const verifyPlugins = () => {
  const pluginDirs = fs.readdirSync(pluginsPath);
  const verifiedPlugins = [];

  pluginDirs.forEach((pluginName) => {
    const pluginPath = path.join(pluginsPath, pluginName);
    const loadPluginPath = path.join(pluginPath, "scripts", "loadPlugin.js");
    const handlePluginPath = path.join(
      pluginPath,
      "scripts",
      "handlePlugin.js",
    );
    const metadataPath = path.join(pluginPath, "metadata.json");

    try {
      const metadata = require(metadataPath);

      if (metadata && metadata.name && metadata.version && metadata.author) {
        const loadPluginExists = fs.existsSync(loadPluginPath);
        const handlePluginExists = fs.existsSync(handlePluginPath);

        if (loadPluginExists && handlePluginExists) {
          const loadPlugin = require(loadPluginPath);
          const handlePlugin = require(handlePluginPath);

          if (loadPlugin.load && handlePlugin.handle) {
            verifiedPlugins.push({ ...metadata, loadPlugin, handlePlugin });
          } else {
            console.warn(`Invalid functions in ${pluginName}.`);
          }
        } else {
          console.warn(`Missing script files in ${pluginName}.`);
        }
      } else {
        console.warn(`Invalid metadata for ${pluginName}.`);
      }
    } catch (error) {
      console.error(`Error loading metadata for ${pluginName}:`, error);
    }
  });

  return verifiedPlugins;
};

module.exports = verifyPlugins;
