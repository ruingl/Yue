const gradient = require("gradient-string");
const path = require("path");
const fs = require("fs");

const commandsPath = path.join(__dirname, "scripts", "commands");
const eventsPath = path.join(__dirname, "scripts", "events");

const loadAll = async () => {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((f) => f.endsWith(".js"));
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((f) => f.endsWith(".js"));

  for (const i of commandFiles) {
    try {
      const start = new Date();
      const cmd = require(path.join(commandsPath, i));

      if (!cmd) {
        throw new Error(`Command: ${i} does not export anything!`);
      } else if (!cmd.config) {
        throw new Error(`Command: ${i} does not export a config object!`);
      } else if (!cmd.onRun) {
        throw new Error(`Command: ${i} does not export a onRun function!`);
      } else {
        global.Yue.commands.set(cmd.config.name, cmd);
        const end = new Date();

        const duration = end - start;
        console.log(gradient.rainbow(`Loaded ${i} (${duration}ms)\n`));
      }
    } catch {}
  }

  for (const i of eventFiles) {
    const start = new Date();
    const cmd = require(path.join(eventsPath, i));

    if (!cmd) {
      throw new Error(`Event: ${i} does not export anything!`);
    } else if (!cmd.config) {
      throw new Error(`Event: ${i} does not export a config object!`);
    } else if (!cmd.onEvent) {
      throw new Error(`Event: ${i} does not export a onEvent function!`);
    } else {
      global.Yue.events.set(cmd.config.name, cmd);
      const end = new Date();

      const duration = end - start;
      console.log(gradient.rainbow(`Loaded ${i} (${duration}ms)\n`));
    }
  }
};

module.exports = { loadAll };
