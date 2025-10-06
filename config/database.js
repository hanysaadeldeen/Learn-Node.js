const mongoose = require("mongoose");
const DB = process.env.DB_Url;
// const dbConnection = () => {
//   mongoose.connect(process.env.MONGO_URI).then((con) => {
//     // console.log("Connected to MongoDB", con.connection.host);
//   });
//   // .catch((error) => {
//   //   console.log("Error connecting to MongoDB", error);
//   //   process.exit();
//   // });
// };

// module.exports = dbConnection;

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
