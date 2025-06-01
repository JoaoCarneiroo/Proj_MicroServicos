FROM node:20

# Set a consistent working directory
WORKDIR /usr/src/app

# Copy and install dependencies
COPY src/package*.json ./
RUN npm install

# Copy all service source files
COPY src/ .

# Expose the correct port
EXPOSE 6000

# Start the service
CMD ["npx", "nodemon", "notifService.js", "-L"]
