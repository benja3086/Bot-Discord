const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = async (client) => {
    if (!process.env.TOKEN) {
        console.error("❌ TOKEN no encontrado en .env");
        return;
    }

    if (!process.env.CLIENT_ID) {
        console.error("❌ CLIENT_ID no encontrado en .env");
        return;
    }

    if (!process.env.GUILD_ID) {
        console.error("❌ GUILD_ID no encontrado en .env");
        return;
    }

    const commands = [];
    const commandsPath = path.join(__dirname, "../slashcommands");

    const readCommands = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                readCommands(fullPath);
            } else if (file.endsWith(".js")) {
                try {
                    const command = require(fullPath);

                    // 🔥 ESTA ES LA PARTE QUE FALTABA
                    if (command.data && command.execute) {
                        client.commands.set(command.data.name, command); // <<--- ✔ GUARDAR COMANDO

                        commands.push(command.data.toJSON());
                        console.log(`✅ Comando cargado: ${command.data.name}`);
                    }
                } catch (error) {
                    console.error(`❌ Error cargando ${file}:`, error.message);
                }
            }
        });
    };

    readCommands(commandsPath);

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
        console.log(`📤 Registrando ${commands.length} comandos...`);

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("✅ Comandos registrados exitosamente (instantáneo)");
    } catch (error) {
        console.error("❌ Error registrando comandos:", error);
    }
};
