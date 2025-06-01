FROM node:20

WORKDIR /usr/src/app

# Copy dependencies files first to leverage Docker layer cache
COPY src/package*.json ./
RUN npm install

# Copy the rest of the application code
COPY src/ .

EXPOSE 4000

CMD ["npx", "nodemon", "authService.js", "-L"]
