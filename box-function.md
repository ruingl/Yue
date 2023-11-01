### `box.react(emoji: string): void`
This function is used to react to the current message with a specified emoji.

**Example usage:**
```javascript
box.react('😊');
```

### `box.reply(msg: string): void`
This function is used to reply to the current message with a specified text.

**Example usage:**
```javascript
box.reply('Hello, World!');
```

### `box.add(uid: string): void`
This function is used to add a user with the given UID to the current group chat.

**Example usage:**
```javascript
box.add('1234567890');
```

### `box.kick(uid: string): void`
This function is used to remove a user with the given UID from the current group chat.

**Example usage:**
```javascript
box.kick('1234567890');
```

### `box.send(msg: string): void`
This function is used to send a message to the current thread without replying to a specific message.

**Example usage:**
```javascript
box.send('Hello, World!');
```

These functions provide basic functionality for interacting with messages, reactions, and group chat management. Use them as building blocks to create more complex behaviors for your bot

### Credits to Liane and Rui. please dont remove creds
