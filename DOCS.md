# Yue Version 1.0.0

Credits to Rui, Liane

## Table of Contents

- [Commands](#commands)
  - [ai](#ai)
  - [prefix](#prefix)
  - [help](#help)

- [Box Functions](#box-functions)
  - [box.react](#boxreact)
  - [box.reply](#boxreply)
  - [box.add](#boxadd)
  - [box.kick](#boxkick)
  - [box.send](#boxsend)

## Commands

### 1. ai

- `:ai [question]` - Ask the chatbot a question, and it will generate a response using the AI API.
  - Example:
    ```plaintext
    :ai How does photosynthesis work?
    ```

### 2. prefix

Get the bot's current command prefix.

- Example:
  ```plaintext
  prefix
  ```

### 3. help

View a list of available commands and their descriptions.

- Example:
  ```plaintext
  :help
  ```

## Box Functions

### 1. box.react

- `box.react(emoji: string): void` - React to the current message with a specified emoji.
  - **Example usage:**
    ```javascript
    box.react("😊");
    ```

### 2. box.reply

- `box.reply(msg: string): void` - Reply to the current message with a specified text.
  - **Example usage:**
    ```javascript
    box.reply("Hello, World!");
    ```

### 3. box.add

- `box.add(uid: string): void` - Add a user with the given UID to the current group chat.
  - **Example usage:**
    ```javascript
    box.add("1234567890");
    ```

### 4. box.kick

- `box.kick(uid: string): void` - Remove a user with the given UID from the current group chat.
  - **Example usage:**
    ```javascript
    box.kick("1234567890");
    ```

### 5. box.send

- `box.send(msg: string): void` - Send a message to the current thread without replying to a specific message.
  - **Example usage:**
    ```javascript
    box.send("Hello, World!");
    ```
