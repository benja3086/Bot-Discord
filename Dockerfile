# Imagen base estable
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json primero
COPY package*.json ./

# Instalamos dependencias (sin dev)
RUN npm install --omit=dev

# Copiamos el resto del proyecto
COPY . .

# Variable de entorno para producción
ENV NODE_ENV=production

# Comando para iniciar el bot
CMD ["node", "."]
