const { config } = require("dotenv");

config()

const APP_PORT = +process.env.APP_PORT;

module.exports = { APP_PORT };
