const fs = require("fs");

module.exports = {
  config: {
    name: "eval",
    description: "Executes the provided JavaScript code",
    usage: ":eval <code>",
    author: "LiANE",
    role: 1,
  },
  run: async ({ api, event, box }) => {
    try {
      const adminList = JSON.parse(
        fs.readFileSync("admin.json", "utf8"),
      ).admins;

      if (!adminList.some((admin) => admin.id === event.senderID)) {
        box.reply("You do not have permission to use this command.");
        return;
      }

      const args = event.body.split(" ");
      const code = args.slice(1).join(" ");
      eval(code);
    } catch (error) {
      box.reply(`🔥 | Oops! may iror
Error: ${error.message}

`);
    }
  },
};
