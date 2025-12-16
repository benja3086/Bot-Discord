const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("salomon")
        .setDescription("Responde a una pregunta con una respuesta aleatoria")
        .addStringOption(option =>
            option
                .setName("pregunta")
                .setDescription("Hazle una pregunta al bot")
                .setRequired(true)
        ),

    async execute(interaction) {
        const pgr = interaction.options.getString("pregunta");

        const respuestas = [
            "Sí",
            "No",
            "Puede ser",
            "Definitivamente",
            "No hay chance",
            "Por supuesto",
            "Obvio"
        ];

        const botrespuestas = respuestas[Math.floor(Math.random() * respuestas.length)];

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(
                "🎱 | Pregunta para: " + interaction.client.user.username +
                "\n\n**Pregunta:** " + pgr +
                "\n\n**Respuesta:** " + botrespuestas
            );

        await interaction.reply({ embeds: [embed] });
    }
};
