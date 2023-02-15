const Server = require("./app/cores/Server");
const env = require("./app/utilities/env");

const server = new Server({
  PORT: env("SERVER_PORT", 3000)
});

server.start();