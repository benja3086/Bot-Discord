const { SlashCommandBuilder } = require("discord.js");
const OpenAI = require("openai");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chatgpt")
        .setDescription("Preguntale algo al asistente bíblico.")
        .addStringOption(option =>
            option
                .setName("pregunta")
                .setDescription("¿Qué querés preguntar?")
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const client = new OpenAI({
                apiKey: process.env.TOKEN_CHATGPT,
                baseURL: `${process.env.TOKEN_EDNPOINT}/openai/deployments/${process.env.AZURE_DEPLOYMENT}`,
                defaultQuery: { "api-version": "2024-06-01" }
            });

            const completion = await client.chat.completions.create({
                model: process.env.AZURE_OPENAI_DEPLOYMENT,
                messages: [
                    {
                        role: "system",
                        content:
                            "Eres un asistente cristiano que responde usando versículos bíblicos relevantes."
                    },
                    {
                        role: "user",
                        content: interaction.options.getString("pregunta")
                    }
                ]
            });

            const respuesta = completion.choices[0].message.content;
            await interaction.editReply(respuesta);

        } catch (error) {
            console.error("❌ Error en ChatGPT Azure:", error);
            await interaction.editReply("Hubo un error procesando tu mensaje 😢");
        }
    }
};
