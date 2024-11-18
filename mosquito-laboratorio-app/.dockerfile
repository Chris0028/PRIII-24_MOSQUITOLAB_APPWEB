# Etapa 1: Construcción de la aplicación
FROM node:18 AS builder

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Configuración del servidor para servir los archivos estáticos
FROM nginx:1.25

# Copiar los archivos estáticos desde la etapa de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto para el servidor
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
