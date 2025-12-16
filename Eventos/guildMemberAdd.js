const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    // Obtener el canal de bienvenidas
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );

    if (!channel) {
      console.log("❌ Canal de bienvenidas no encontrado");
      return;
    }

    // Array de versículos
    const versiculos = [
      `Yo te elegí antes de que nacieras;
te aparté para que hablaras en mi nombre
a todas las naciones del mundo.
Jeremías 1:5`,
      `No permitas que nadie te desprecie por ser joven. Al contrario, trata de ser un ejemplo para los demás cristianos. Que cuando todos oigan tu modo de hablar, y vean cómo vives, traten de ser puros como tú. Que todos imiten tu carácter amoroso y tu confianza en Dios.
1 Timoteo 4:12`,
      `Mis planes para ustedes solamente yo los sé, y no son para su mal, sino para su bien. Voy a darles un futuro lleno de bienestar.
Jeremías 29:11`,

    ];

    // Seleccionar un versículo aleatoriamente
    const versiculoAleatorio =
      versiculos[Math.floor(Math.random() * versiculos.length)];

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`¡Bienvenido ${member.user.username}!`)
      .setDescription(versiculoAleatorio)
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter({ text: `Miembro #${member.guild.memberCount}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  },
};
