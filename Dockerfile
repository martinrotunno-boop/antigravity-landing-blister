FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Variables de entorno necesarias para construir y ejecutar
ENV NITRO_PRESET=node-server
ENV PORT=80
ENV NODE_ENV=production

# Compilar la aplicación
RUN npm run build

# Exponer el puerto
EXPOSE 80

# Iniciar la aplicación
CMD ["node", ".output/server/index.mjs"]
