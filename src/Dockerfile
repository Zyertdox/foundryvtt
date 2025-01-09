# Use Node.js LTS version as base
FROM node:lts

# Set working directory
WORKDIR /app

# Install PM2 globally
RUN npm install pm2@latest -g

# Copy application files
COPY package.json package-lock.json main.js ecosystem.config.js ./
RUN npm install

# Copy scripts
COPY update.sh install.sh /scripts/
RUN chmod +x /scripts/update.sh /scripts/install.sh

# Create directories
RUN mkdir -p /home/foundryvtt
RUN mkdir -p /home/foundrydata

# Mark directories as volumes
VOLUME ["/home/foundryvtt", "/home/foundrydata"]

# Expose ports
EXPOSE 3000
EXPOSE 30000

# CMD to initialize and start the app
CMD ["/scripts/install.sh"]
