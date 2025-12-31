require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection, EmbedBuilder, Events } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

require("./handlers/slashHandler")(client);
require("./handlers/eventHandler")(client);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error("❌ Error ejecutando comando:", error);
    await interaction.reply({
      content: "Hubo un error al ejecutar el comando.",
      ephemeral: true,
    });
  }
});

client.once(Events.ClientReady, (client) => {
  console.log(`Bot listo como ${client.user.tag}`);

  cron.schedule("0 0 12 * * *", async () => {
    try {
      const canal = await client.channels.fetch("696454154410917901");
      if (!canal) return;

      const rutaVersiculos = path.join(__dirname, "Versiculos.txt");
      const rutaEstado = path.join(__dirname, "estado.json");

      const contenido = fs.readFileSync(rutaVersiculos, "utf8");

      const versiculos = contenido
        .split(/\n\s*\n/)
        .map(v => v.trim())
        .filter(v => v.length > 0);

      if (versiculos.length === 0) return;

      let estado = { indice: 0 };
      if (fs.existsSync(rutaEstado)) {
        estado = JSON.parse(fs.readFileSync(rutaEstado, "utf8"));
      }

      if (estado.indice >= versiculos.length) {
        estado.indice = 0;
      }

      const texto = versiculos[estado.indice];

      const embed = new EmbedBuilder()
        .setColor("Orange")
        .setDescription(texto)
        .setFooter({ text: "📖 Versículo del día" });

      await canal.send({ embeds: [embed] });

      estado.indice++;
      fs.writeFileSync(rutaEstado, JSON.stringify(estado, null, 2));

    } catch (error) {
      console.error("❌ Error:", error);
    }
  }, {
    timezone: "America/Argentina/Buenos_Aires",
  });
});

client.login(process.env.TOKEN);
