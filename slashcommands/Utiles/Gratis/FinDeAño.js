const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fin-de-año")
    .setDescription("mensaje de fin de año"),

  async execute(interaction) {
    const canal = await interaction.client.channels.fetch("<696454154410917901>", "<548345577276964864>");
    if (!canal) return;

    const mensaje =
      " ✨🎆 ¡Feliz fin de año! 🎆✨\n\n" +
      "Gracias por estar acá y por acompañarnos durante todo este año. Cada paso, cada momento y cada aprendizaje forman parte del camino que Dios sigue guiando con amor y propósito.\n\n" +
      "Que este nuevo año venga lleno de paz, esperanza y fe renovada. Que Dios bendiga tus proyectos, fortalezca tu corazón y sea tu esperanza en la prueba.\n\n" +
      "“Encomienda al Señor tu camino; confía en Él, y Él actuará.” (Salmos 37:5)\n\n" +
      "Pd: les habla el desarrollador; les quiero desear mucho amor y les pido que tengan confianza en Abba incluso en los momentos difíciles porque él se muestra en ellos.\n\n" +
      "Los quiero mucho y fueron super importantes en este año y se llevan un pedazo de mi corazón.\n\n" +
      "Le pido Dios que puedan seguir bendiciéndome el 2026!\n\n" +
      "Yo te pido que seas fuerte y valiente, que no te desanimes ni tengas miedo, porque yo soy tu Dios, y te ayudaré por dondequiera que vayas.\n\n" +
      "Josué 1:9\n\n" +
      "Que el próximo año nos encuentre más unidos, con más amor y con ganas de seguir creciendo juntos.\n\n" +
      "✨ ¡Feliz Año Nuevo! ✨";

    const embed = new EmbedBuilder().setColor("Blue").setDescription(mensaje);

    await interaction.reply({ embeds: [embed] });
  },
};
