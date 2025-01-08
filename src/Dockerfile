# Use Node.js LTS version as base
FROM node:lts

# Set working directory
WORKDIR /app
RUN npm install pm2@latest -g
RUN pm2 startup

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .
RUN chmod +x script.sh

RUN mkdir /home/foundryvtt
RUN mkdir /home/foundrydata

# Expose the port
EXPOSE 3000
EXPOSE 30000

# Run the server
CMD ["node", "server.js"]
