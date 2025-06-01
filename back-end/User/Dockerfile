FROM node:20

WORKDIR /usr/src/app

# Instalar PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Copiar o package.json e instalar as dependências Node.js
COPY src/package*.json ./
RUN npm install

# Copiar o restante do código
COPY src/ .

# Expõe a porta do serviço de Utilizadores
EXPOSE 5000

# Iniciar o Serviço de Utilizadores
CMD ["npx", "nodemon", "userService.js", "-L"]
