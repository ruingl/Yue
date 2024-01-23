const fs = require("fs");

module.exports = {
  config: {
    name: "admin",
    description: "Displays a list of admins or manages admins.",
    usage: ":admin [add/remove/list] [userID]",
    author: "Rui",
  },

  run: async ({ api, event, args, box }) => {
    const [action, userID] = args;
    const adminList = JSON.parse(fs.readFileSync("admin.json", "utf8")).admins;

    if (!adminList.some((admin) => admin.id === event.senderID)) {
      box.reply("You do not have permission to use this command.");
      return;
    }

    if (action === "add") {
      addAdmin(api, event, userID, box);
    } else if (action === "remove") {
      removeAdmin(api, event, userID, box);
    } else if (action === "list") {
      listAdmins(api, event, box);
    } else {
      box.reply("Invalid usage. Please use :admin [add/remove/list] [userID]");
    }
  },
};

function loadAdmins() {
  try {
    const adminData = fs.readFileSync("admin.json", "utf8");
    const admins = JSON.parse(adminData).admins;
    return admins;
  } catch (error) {
    console.error("Error loading admin list:", error);
    return [];
  }
}

function saveAdmins(admins) {
  const data = { admins: admins };
  fs.writeFileSync("admin.json", JSON.stringify(data, null, 2));
}

function addAdmin(api, event, userID, box) {
  let admins = loadAdmins();

  if (!admins.some((admin) => admin.id === userID)) {
    admins.push({ id: userID, name: `Admin${admins.length + 1}` });
    saveAdmins(admins);
    box.reply(`Admin with ID ${userID} has been added.`);
  } else {
    box.reply(`User with ID ${userID} is already an admin.`);
  }
}

function removeAdmin(api, event, userID, box) {
  let admins = loadAdmins();

  const index = admins.findIndex((admin) => admin.id === userID);
  if (index !== -1) {
    const removedAdmin = admins.splice(index, 1)[0];
    saveAdmins(admins);
    box.reply(`Admin with ID ${removedAdmin.id} has been removed.`);
  } else {
    box.reply(`User with ID ${userID} is not an admin.`);
  }
}

function listAdmins(api, event, box) {
  let admins = loadAdmins();
  if (admins.length > 0) {
    const adminList = admins
      .map((admin) => `${admin.name} (ID: ${admin.id})`)
      .join("\n");
    box.reply(`List of admins:\n${adminList}`);
  } else {
    box.reply("No admins found.");
  }
}
