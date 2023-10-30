const fs = require("fs");
const path = require("path");

const ADMIN_FILE_PATH = "../../admin.json";

module.exports = {
  config: {
    name: "admin",
    description: "Displays a list of admins.",
    usage: ":admin [add/remove] [userID]",
    author: "Rui",
    role: 1, // Set the role to 0 for everyone or 1 for admins only
  },

  run: ({ api, event, args }) => {
    const [action, userID] = args;

    if (action === "add") {
      addAdmin(api, event, userID);
    } else if (action === "remove") {
      removeAdmin(api, event, userID);
    } else {
      api.sendMessage("Invalid usage. Please use :admin [add/remove] [userID]", event.threadID, event.messageID);
    }
  }
};

function loadAdmins() {
  try {
    const adminData = fs.readFileSync(path.resolve(__dirname, ADMIN_FILE_PATH));
    const admins = JSON.parse(adminData).admins;
    return admins;
  } catch (error) {
    console.error("Error loading admin list:", error);
    return [];
  }
}

function saveAdmins(admins) {
  const data = { admins: admins };
  fs.writeFileSync(path.resolve(__dirname, ADMIN_FILE_PATH), JSON.stringify(data, null, 2));
}

function addAdmin(api, event, userID) {
  let admins = loadAdmins();

  if (!admins.some(admin => admin.id === userID)) {
    admins.push({ id: userID, name: `Admin${admins.length + 1}` });
    saveAdmins(admins);
    api.sendMessage(`Admin with ID ${userID} has been added.`, event.threadID);
  } else {
    api.sendMessage(`User with ID ${userID} is already an admin.`, event.threadID);
  }
}

function removeAdmin(api, event, userID) {
  let admins = loadAdmins();

  const index = admins.findIndex(admin => admin.id === userID);
  if (index !== -1) {
    const removedAdmin = admins.splice(index, 1)[0];
    saveAdmins(admins);
    api.sendMessage(`Admin with ID ${removedAdmin.id} has been removed.`, event.threadID);
  } else {
    api.sendMessage(`User with ID ${userID} is not an admin.`, event.threadID);
  }
}
