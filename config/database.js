const mongoose = require("mongoose");
const DB = process.env.dataBase_Url;
const dbConnection = () => {
  mongoose
    .connect(DB)
    .then((con) => {
      console.log("Connected to MongoDB", con.connection.host);
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
      process.exit();
    });
};

module.exports = dbConnection;
