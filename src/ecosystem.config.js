module.exports = {
    apps: [
        {
            name: "update-service",
            script: "/app/main.js",
            args: "--port=3000",
            watch: false,
        },
        {
            name: "foundry-service",
            script: "/home/foundryvtt/main.js",
            args: "--dataPath=/home/foundrydata",
            watch: false,
        },
    ],
};
