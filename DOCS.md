## Yue Version 1.0.0
Credits to Rui, Liane

### Table of Contents:

1. [ai](#ai)
5. [box.react](#boxreact)
6. [box.reply](#boxreply)
7. [box.add](#boxadd)
8. [box.kick](#boxkick)
9. [box.send](#boxsend)

### 1. [ai](#ai)
- `:ai [question]` - Ask the chatbot a question, and it will generate a response using the AI API.
  Example:
  ```plaintext
  :ai How does photosynthesis work?
  ```

### 5. [box.react](#boxreact)
- `box.react(emoji: string): void` - React to the current message with a specified emoji.
  **Example usage:**
  ```javascript
  box.react('😊');
  ```

### 6. [box.reply](#boxreply)
- `box.reply(msg: string): void` - Reply to the current message with a specified text.
  **Example usage:**
  ```javascript
  box.reply('Hello, World!');
  ```

### 7. [box.add](#boxadd)
- `box.add(uid: string): void` - Add a user with the given UID to the current group chat.
  **Example usage:**
  ```javascript
  box.add('1234567890');
  ```

### 8. [box.kick](#boxkick)
- `box.kick(uid: string): void` - Remove a user with the given UID from the current group chat.
  **Example usage:**
  ```javascript
  box.kick('1234567890');
  ```

### 9. [box.send](#boxsend)
- `box.send(msg: string): void` - Send a message to the current thread without replying to a specific message.
  **Example usage:**
  ```javascript
  box.send('Hello, World!');
  ```
