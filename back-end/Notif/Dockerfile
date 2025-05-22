# Dockerfile para o serviço de notificação
FROM node:20

WORKDIR /Notif/src

# Copiar o package.json e instalar as dependências
COPY src/package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expõe a porta do serviço de notificações
EXPOSE 6000

# Iniciar o serviço
CMD ["npx", "nodemon", "notifService.js", "-L"]
