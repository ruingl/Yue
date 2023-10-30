module.exports = {
  config: {
    name: "eval",
    description: "Executes the provided JavaScript code",
    usage: ":eval <code>",
    author: "LiANE",
  },
  run: ({ api, event }) => {
    try {
const args = event.body.split(" ");
      const code = args.slice(1).join(" ");
      eval(code);

    } catch (error) {
      api.sendMessage(`🔥 | Oops! Nag error:
Error: ${error.message}

Body:
${code}`, event.threadID);
    }
  },
};