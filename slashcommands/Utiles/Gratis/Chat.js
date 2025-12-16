const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { main } = require("./ChatGpt");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giro-bot")
    .setDescription("Responde a una pregunta")
    .addStringOption(option =>
      option
        .setName("pregunta")
        .setDescription("Hazle una pregunta")
        .setRequired(true)
    ),

  async execute(interaction) {
  await interaction.deferReply(); 


    const pgr = interaction.options.getString("pregunta");

    const respuesta = await main(pgr);

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setDescription(
      `\n${pgr}\n\n${respuesta}`
    );
    await interaction.editReply({ embeds: [embed] });
  }
};
