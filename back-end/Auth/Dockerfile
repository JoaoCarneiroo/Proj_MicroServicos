FROM node:20

WORKDIR /usr/src/app

# Copiar o package.json e instalar as dependências Node.js
COPY src/package*.json ./
RUN npm install

# Copiar o restante do código
COPY src/ .

# Expõe a porta do serviço de autenticação
EXPOSE 4000

# Iniciar o Serviço de Autenticação
CMD ["npx", "nodemon", "authService.js", "-L"]
