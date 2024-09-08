const promisify = require("node:util").promisify;
const login = promisify(require("./fca-unofficial"));
const fs = require("fs-extra");

module.exports = async () => {
  const appState = await fs.readJSON("../fbState.json");
  const api = await login({ appState });

  if (!api) {
    process.exit();
  } else {
    api.listenMqtt(async (err, event) => {
      if (err) process.exit();

      require("./listen")(api, event);
    });
  }
};
