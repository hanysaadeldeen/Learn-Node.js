const mongoose = require("mongoose");
const DB = process.env.DB_Url;
const dbConnection = () => {
  mongoose.connect(DB).then((con) => {
    // console.log("Connected to MongoDB", con.connection.host);
  });
  // .catch((error) => {
  //   console.log("Error connecting to MongoDB", error);
  //   process.exit();
  // });
};

module.exports = dbConnection;
