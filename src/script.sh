#!/bin/bash
echo "Loading new version from: $1"

wget -O /home/foundryvtt.zip $1
unzip -o /home/foundryvtt.zip -d /home/foundryvtt
rm /home/foundryvtt.zip
pm2 start /home/foundryvtt/resources/app/main.js -f -- --dataPath=/home/foundrydata