const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Te ayuda con los comandos"),

  async execute(interaction) {
    const mensaje =
      "que onda locura, mi nombre es Giro Bot \n" +
      "Estoy acá para lo que necesites.\n\n" +
      "📌 Comandos disponibles:\n\n" +
      "/help → muestra la lista de comandos\n\n" +
      "/giro-bot → podes hablar conmigo\n\n"+
      "/salomon → podes hacerle pregunta a salomon de si y no\n\n"+
      "Usar siempre '/' para poder activar los comandos\n\n";


    await interaction.reply(mensaje);
  }
};
