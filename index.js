require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Colección donde se guardan los comandos
client.commands = new Collection();

// Cargar handlers
require("./handlers/slashHandler")(client);
require("./handlers/eventHandler")(client);

// Evento para ejecutar los comandos
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error("❌ Comando no encontrado:", interaction.commandName);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error("❌ Error ejecutando comando:", error);
        await interaction.reply({
            content: "Hubo un error al ejecutar el comando.",
            ephemeral: true
        });
    }
});

client.login(process.env.TOKEN);
