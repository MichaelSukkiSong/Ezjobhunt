const { OpenAI } = require("openai");

class OpenAIAPI {
  static getInstance() {
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  constructor(config) {
    this.openai = new OpenAI(config);
  }

  async createChatCompletion(message) {
    const chatCompletion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        { role: "user", content: message },
      ],
    });

    return chatCompletion;
  }
}

module.exports = OpenAIAPI.getInstance();
