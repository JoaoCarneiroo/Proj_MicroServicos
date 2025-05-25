# Dockerfile para o serviço de autenticação
FROM node:20

WORKDIR /Tasks/src

# Copiar o package.json e instalar as dependências
COPY src/package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expõe a porta do serviço de autenticação
EXPOSE 7000

# Iniciar o serviço
CMD ["npx", "nodemon", "taskService.js", "-L"]
