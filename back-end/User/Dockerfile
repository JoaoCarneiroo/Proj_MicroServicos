# Dockerfile para o serviço de utilizadores
FROM node:20

WORKDIR /User/src

# Instala dependências do sistema
RUN apt-get update && apt-get install -y postgresql-client

# Copiar o package.json e instalar as dependências Node
COPY src/package*.json ./
RUN npm install

# Copiar o restante do código, incluindo o script de espera
COPY . .


# Expõe a porta do serviço de utilizadores
EXPOSE 5000

# Iniciar o serviço apenas após o PostgreSQL estar pronto
CMD ["npx", "nodemon", "userService.js"]
