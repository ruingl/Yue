/*
  Hey there! This is the command format for your bot. Feel free to use it as a template.
*/

module.exports = {
    config: {
        name: "example", // Replace with your command name
        description: "Briefly describes what the command does.", // Replace with your command description
        usage: ":example", // Replace with example usage
        author: "AuthorName", // Replace with author name
        version: "1.0.0", // Replace with command version
    },
    run: ({ api, event }) => {
        // Your command logic using box.send goes here
        box.send("Hello from the example command!");
    }
};
