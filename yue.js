process.on("unhandledRejection", (e) => console.error(e));
process.on("uncaughtExcpetion", (e) => console.error(e));
console.clear();

const gradient = require("gradient-string");
const __pkg = require("./package.json");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

global.Yue = new Object({
  get config() {
    return fs.readJSONSync(path.join(__dirname, "config.json"));
  },
  commands: new Map(),
  events: new Map(),
});

global.Yue.utils = require(path.join(__dirname, "utils.js"));

const start = async () => {
  console.log(gradient.retro(`⟩ Yue - (${__pkg.version}) 🙀`));
  console.log(gradient.retro("⟩ by ruingl ♥️"));
  console.log("");
  console.log(gradient.rainbow("Loaded Commands:"));
  await global.Yue.utils.loadAll();

  require(path.join(__dirname, "yuebot", "login.js"))();
};

start();
