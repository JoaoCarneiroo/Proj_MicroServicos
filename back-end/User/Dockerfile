FROM node:20

WORKDIR /usr/src/app

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Copy only the package files first to install dependencies
COPY src/package*.json ./
RUN npm install

# Then copy the rest of the code from src/
COPY src/ .

EXPOSE 5000

CMD ["npx", "nodemon", "userService.js", "-L"]
