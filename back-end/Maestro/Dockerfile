FROM node:20

WORKDIR /usr/src/app

# Copiar o package.json e instalar as dependências Node.js
COPY src/package*.json ./
RUN npm install

# Copiar o restante do código
COPY src/ .

# Expõe a porta do serviço Maestro
EXPOSE 3000

# Iniciar o Serviço Maestro
CMD ["npx", "nodemon", "maestroService.js", "-L"]
