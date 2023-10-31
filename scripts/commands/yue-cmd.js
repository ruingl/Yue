const fs = require('fs');
const path = require('path');
const { createPaste } = require('pastebin-js');

module.exports = {
  config: {
    name: 'pastebin',
    usage: ':pastebin <filename>',
    description: 'Upload files to Pastebin and send the link',
    role: 1,
    author: 'SANDIP',
  },

  run: async function ({ api, event, args }) {
    const fileName = args[0];
    const filePathWithoutExtension = path.join(__dirname, '..', 'commands', fileName);
    const filePathWithExtension = path.join(__dirname, '..', 'commands', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('Error...', event.threadID);
    }

    const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) throw err;

      try {
        const pasteURL = await createPaste({
          text: data,
          title: fileName,
          format: null,
          privacy: 1,
          expiration: 'N',
        });

        api.sendMessage(`Uploaded!\n\n${pasteURL}`, event.threadID);
      } catch (error) {
        console.error(error);
        api.sendMessage('Error uploading to Pastebin.', event.threadID);
      }
    });
  },
};
