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
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Compilar la aplicación
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Iniciar la aplicación
CMD ["node", ".output/server/index.mjs"]
