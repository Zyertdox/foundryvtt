FROM node:22
WORKDIR /app

RUN npm install pm2@latest -g

COPY package.json package-lock.json main.js ecosystem.config.js ./
RUN npm install

COPY update.sh install.sh /scripts/
RUN chmod +x /scripts/update.sh /scripts/install.sh

# Create non-root user
RUN groupadd -r -g 1000 foundry && useradd -r -u 1000 -g foundry foundry

RUN mkdir -p /home/foundryvtt /home/foundrydata && \
    chown -R foundry:foundry /home/foundryvtt /home/foundrydata /app /scripts

VOLUME ["/home/foundryvtt", "/home/foundrydata"]

# Switch to non-root user
USER foundry

EXPOSE 3000
EXPOSE 30000

CMD ["/scripts/install.sh"]
