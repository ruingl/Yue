const { spawn } = require("child_process");

process.env.BLUEBIRD_W_FORGOTTEN_RETURN = 0;
const start = () => {
  const child = spawn("node yue.js", {
    cwd: __dirname,
    env: process.env,
    stdio: "inherit",
    shell: true,
  });

  child.on("close", (c) => {
    if (c === 2) start();
  });
};

start();
