FROM node:20

WORKDIR /Maestro/src

# Copy only package files first (to leverage Docker cache)
COPY src/package*.json ./
RUN npm install

# Copy the rest of the source code
COPY src/ .

EXPOSE 3000

CMD ["npx", "nodemon", "maestroService.js", "-L"]
