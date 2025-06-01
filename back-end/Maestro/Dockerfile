FROM node:20

# Set to a conventional working directory
WORKDIR /usr/src/app

# Install dependencies
COPY src/package*.json ./
RUN npm install

# Copy rest of the source
COPY src/ .

# Expose the port
EXPOSE 3000

# Start the service
CMD ["npx", "nodemon", "maestroService.js", "-L"]
