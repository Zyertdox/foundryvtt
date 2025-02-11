#!/bin/bash

UPDATE_SERVICE_NAME="update-service"
FOUNDRY_SERVICE_NAME="foundry-service"
TARGET_DIR="/home/foundryvtt/resources/app"
SOURCE_DIR="/app"

# Ensure the target directory exists
mkdir -p "$TARGET_DIR"

# Check if the target directory is empty
if [ ! "$(ls -A $TARGET_DIR)" ]; then
    echo "Target directory '$TARGET_DIR' is empty. Initializing data..."
    cp -r "$SOURCE_DIR/"* "$TARGET_DIR/"
    echo "Data initialization completed."
else
    echo "Target directory '$TARGET_DIR' is not empty. Skipping data initialization."
fi

pm2-runtime /app/ecosystem.config.js