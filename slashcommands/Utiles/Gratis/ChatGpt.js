const { OpenAI } = require("openai");
require("dotenv").config();

const endpoint = process.env.TOKEN_EDNPOINT;
const deployment_name = process.env.AZURE_OPENAI_DEPLOYMENT;
const api_key = process.env.TOKEN_CHATGPT;

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: api_key,
});

async function main(pregunta) {
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "developer",
        content: "Eres un assistente de un grupo de jovenes responde con amor.",
      },
      { role: "user", content: pregunta },
    ],
    model: deployment_name,
  });

  return completion.choices[0].message.content;
}

module.exports = { main };
