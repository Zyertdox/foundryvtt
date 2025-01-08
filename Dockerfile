# Use Node.js LTS version as base
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Expose the port
EXPOSE 3000

# Run the server
CMD ["node", "server.js"]
