const app = require("../app");
const dbConnection = require("../config/database");

// Connect to MongoDB
dbConnection();

module.exports = app;
