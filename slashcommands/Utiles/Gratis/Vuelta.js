const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", async () => {
  try {
    const canal = await client.channels.fetch("696454154410917901");
    if (!canal || !canal.isTextBased()) return;

    await canal.send(
      "🎉 **Giro Bot está de vuelta**\n\n" +
      "Ya solucionamos todos los problemas y estamos listos\n" +
      "para seguir dándole al canal más top de Tucumán.\n\n" +
      "¿Me extrañaron?\n\n" +
      "❤️ Reaccionen con un corazón si me extrañaron."
    );
  } catch (err) {
    console.error("Error enviando mensaje de regreso:", err);
  }
});

client.login(process.env.TOKEN);
