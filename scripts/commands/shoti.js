const axios = require("axios");
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
    // Code to deduct money from the user goes here if needed

    api.sendMessage(`📸 𝗦𝗵𝗼𝘁𝗶:

You have successfully purchased a shoti video for ${xycost}💵!
Please wait for the video..`, event.threadID, event.messageID);

    try {
      let apiUrl = "https://api--v1-shoti.vercel.app/api/v1/get";

      // Make a POST request to get the video URL
      let { data } = await axios.post(apiUrl, {
        apikey: "$shoti-1hea9d5pm9rlq7urifo",
      });

      console.log("API Response:", data); // Log the API response for inspection

      const videoUrl = data.data.url; // Extract video URL from the response

      const downloadDirectory = path.join(__dirname, "cache");
      const downloadPath = path.join(downloadDirectory, "video.mp4");

      // Create the cache directory if it doesn't exist
      if (!fs.existsSync(downloadDirectory)) {
        fs.mkdirSync(downloadDirectory, { recursive: true });
      }

      const response = await axios.get(videoUrl, { responseType: "stream" });
      const file = fs.createWriteStream(downloadPath);

      response.data.pipe(file);

      file.on("finish", () => {
        file.close(() => {
          api.sendMessage(
            {
              attachment: fs.createReadStream(downloadPath),
            },
            event.threadID
          );
        });
      });
    } catch (error) {
      console.error(error);
      api.sendMessage(`📸 𝗦𝗵𝗼𝘁𝗶:

Oops! An error occurred while fetching the video.`, event.threadID, event.messageID);
    }
  },
};
