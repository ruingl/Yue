const axios = require("axios");
const request = require("request");
const path = require("path");
const fs = require("fs");

module.exports = {
  config: {
    name: "shoti",
    description: "Watch shoti video 📸",
    usage: ":shoti",
    author: "XyryllPanget",
    // Redesign by RUI
  },

  run: async function ({ api, event, message }) {
    const xycost = 0; // Setting xycost to 0
    const user = event.senderID;
    // Deduct the cost of using the command
    // Code to deduct money from user goes here if needed

    api.sendMessage(`📸 𝗦𝗵𝗼𝘁𝗶:

You have successfully purchased a shoti video for ${xycost}💵!
Please wait for the video..`, event.threadID, event.messageID);

    try {
      const apiUrl = "https://api--v1.shoti.vercel.app/api/v1/get?apikey=shoti-1hea9d5pm9rlq7urifo";
      const downloadDirectory = path.join(__dirname, "cache");
      const downloadPath = path.join(downloadDirectory, "video.mp4");

      // Create the cache directory if it doesn't exist
      if (!fs.existsSync(downloadDirectory)) {
        fs.mkdirSync(downloadDirectory, { recursive: true });
      }

      const response = await axios.get(apiUrl);
      const videoData = response.data.data;

      if (!videoData || !videoData.play) {
        console.error("Invalid API response format:", response.data);
        throw new Error("Invalid API response format.");
      }

      const videoUrl = videoData.play; // Use the play URL from the API response
      const file = fs.createWriteStream(downloadPath);
      const requestStream = request(videoUrl);

      requestStream.pipe(file);
      file.on("finish", () => {
        api.sendMessage(
          {
            attachment: fs.createReadStream(downloadPath),
          },
          event.threadID
        );
      });
    } catch (error) {
      console.error(error);
      api.sendMessage(`📸 𝗦𝗵𝗼𝘁𝗶:

Oops! An error occurred while fetching the video.`, event.threadID, event.messageID);
    }
  },
};
