# Dockerfile para o serviço orquestrador
FROM node:20

WORKDIR /Maestro

# Copiar o package.json e instalar as dependências
COPY package.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expõe a porta do orquestrador
EXPOSE 3000

# Iniciar o serviço orquestrador
CMD ["node", "maestroService.js"]
