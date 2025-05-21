# Dockerfile para o serviço de autenticação
FROM node:20

WORKDIR /Auth/src

# Copiar o package.json e instalar as dependências
COPY src/package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expõe a porta do serviço de autenticação
EXPOSE 4000

# Iniciar o serviço
CMD ["npx", "nodemon", "authService.js", "-L"]
