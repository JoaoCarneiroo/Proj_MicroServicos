FROM node:20

WORKDIR /usr/src/app

# Install only the necessary package files
COPY src/package*.json ./
RUN npm install

# Copy all remaining app source files
COPY src/ .

# Expose port for Task service
EXPOSE 7000

# Run the service
CMD ["npx", "nodemon", "taskService.js", "-L"]
