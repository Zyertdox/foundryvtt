#!/bin/bash
echo "Loading new version from: $1"
FOUNDRY_SERVICE_NAME="foundry-service"

wget -O /home/foundryvtt.zip $1
unzip -o /home/foundryvtt.zip -d /home/foundryvtt
rm /home/foundryvtt.zip
pm2 restart $FOUNDRY_SERVICE_NAME