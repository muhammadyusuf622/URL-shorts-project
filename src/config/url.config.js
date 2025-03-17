const { config } = require("dotenv");

config();

const SERVER_BASE_URL = process.env.BASE_SERVER_URL;

module.exports = { SERVER_BASE_URL };
