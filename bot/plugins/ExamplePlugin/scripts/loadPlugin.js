const path = require('path');

module.exports = (pluginName) => {
  try {
    const pluginPath = path.join(__dirname, 'scripts', pluginName, 'loadPlugin.js');
    return require(pluginPath);
  } catch (error) {
    console.error(`Error loading ${pluginName} plugin:`, error);
    return null;
  }
};