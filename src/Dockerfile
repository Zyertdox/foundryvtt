FROM node:22
WORKDIR /app

RUN npm install pm2@latest -g

COPY package.json package-lock.json main.js ecosystem.config.js ./
RUN npm install

COPY update.sh install.sh /scripts/
RUN chmod +x /scripts/update.sh /scripts/install.sh

RUN mkdir -p /home/foundryvtt
RUN mkdir -p /home/foundrydata

VOLUME ["/home/foundryvtt", "/home/foundrydata"]

EXPOSE 3000
EXPOSE 30000

CMD ["/scripts/install.sh"]
