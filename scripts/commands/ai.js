const axios = require('axios');

module.exports = {
  config: {
    name: 'ai',
    description: 'Generate AI-based responses using GPT.',
    usage: ':ai <query>',
    author: 'Rui',
  },
  run: async ({ api, event, args }) => {
    const input = args.join(' ');

    if (!input) {
      api.sendMessage('No query detected. Correct usage is `:ai <query>`.', event.threadID, event.messageID);
      return;
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: input,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY',
          },
        }
      );

      const aiResponse = response.data.choices[0]?.text.trim() || 'No response from AI.';

      api.sendMessage(aiResponse, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error generating AI response:', error.message);
      api.sendMessage('An error occurred while generating AI response.', event.threadID, event.messageID);
    }
  },
};
