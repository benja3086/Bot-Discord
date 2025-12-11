const fs = require("fs");
const path = require("path");

module.exports = (client) => {
    const eventsPath = path.join(__dirname, "../Eventos");

    if (!fs.existsSync(eventsPath)) {
        console.log("⚠️ Carpeta /Eventos no encontrada");
        return;
    }

    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

    eventFiles.forEach((file) => {
        try {
            const event = require(path.join(eventsPath, file));
            if (event.name && event.execute) {
                client.on(event.name, (...args) => event.execute(...args));
                console.log(`✅ Evento cargado: ${event.name}`);
            }
        } catch (error) {
            console.error(`❌ Error cargando evento ${file}:`, error);
        }
    });
};
