const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feliz-navidad")
    .setDescription("Envía un mensaje de Feliz Navidad"),

  async execute(interaction) {
    const mensaje =
    "🎄✨ ¡Feliz Navidad! ✨🎄\n"+
    "Que hoy recordemos que Jesús nació para traer luz, esperanza y amor a nuestras vidas ❤️\n"+

    " En esta Navidad, recordemos que el mayor regalo es Jesús.\n"+
    "Que Dios bendiga cada familia y que nunca falte la fe, incluso en los días difíciles\n\n  "+
"Dará a luz un hijo y le pondrás por nombre Jesús, porque él salvará a su pueblo de sus pecados».\n"+
"— Mateo 1:21 \n\n"+
"Los quiero mucho.\n"+
"— Giro Bot 🤍";
    await interaction.reply(mensaje);
  }
};
