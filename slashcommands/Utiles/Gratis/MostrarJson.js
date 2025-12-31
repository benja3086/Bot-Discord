const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const USER_ID_AUTORIZADO = "TU_ID_ACA";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("versiculo-actual")
    .setDescription("Solo para uso del desarrollador: Muestra el versículo actual del bot."),

  async execute(interaction) {

    if (interaction.user.id !== "577680569685770241") {
      return interaction.reply({
        content: "❌ No tenés permiso para usar este comando.",
        ephemeral: true
      });
    }

    await interaction.deferReply();

    const ruta = path.resolve(process.cwd(), "estado.json");

    let estado;
    try {
      estado = JSON.parse(fs.readFileSync(ruta, "utf8"));
    } catch (error) {
      return interaction.editReply("❌ No se pudo leer el estado del versículo.");
    }

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setDescription(
        `📖 El bot va por el versículo número:\n\n**${estado.indice}**`
      );

    await interaction.editReply({ embeds: [embed] });
  }
};
