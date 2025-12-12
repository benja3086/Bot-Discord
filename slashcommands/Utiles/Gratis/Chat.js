const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { main } = require("./ChatGpt");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("habla-conmigo")
    .setDescription("Responde a una pregunta")
    .addStringOption(option =>
      option
        .setName("pregunta")
        .setDescription("Hazle una pregunta")
        .setRequired(true)
    ),

  async execute(interaction) {
    const pgr = interaction.options.getString("pregunta");

    const respuesta = await main(pgr);

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(respuesta);

    await interaction.reply({ embeds: [embed] });
  }
};
