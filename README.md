# YueV1

YueV1 is a versatile and customizable chatbot engine for Facebook Messenger, powered by Node.js and integrated with various APIs for enhanced functionality.

## Features

- **Command System:** Easily create, manage, and execute commands with a flexible command system.
- **API Integration:** Utilizes APIs for AI, messaging, and more to enhance its capabilities.
- **Command Installer:** Install custom commands on-the-fly using `yue-cmd install` command.

## Getting Started

To get started with YueV1, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ruihq/YueV1.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your configurations in `config.json`.

4. Run the bot:
   ```bash
   npm start
   ```

## Command Documentation

### `:ai [question]`

Ask the chatbot a question, and it will generate a response using the AI API.

Example:
```
:ai How does photosynthesis work?
```

### `:prefix`

Get the bot's current command prefix.

Example:
```
:prefix
```

### `:help`

View a list of available commands and their descriptions.

Example:
```
:help
```

## box.?? docs
<a href="box-function.md">DOCUMENTATION HERE</a>

## Command Installer

To install a new command, use the `yue-cmd install` command:

```
:yue-cmd install [code or Pastebin URL] [commandName].js
```

Example:
```
:yue-cmd install https://pastebin.com/raw/kM89du87 test.js
```

## Credits

This project utilizes the following APIs:

- [FCA-Unofficial](https://github.com/VangBanLaNhat/fca-unofficial) - FCA API for Facebook Messenger.
- [Herc.ai](https://github.com/Bes-js/herc.ai) - AI API for natural language processing.

A special thanks to the creators and contributors of these APIs for their valuable contributions to this project.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
