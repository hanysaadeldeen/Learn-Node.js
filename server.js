const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const dbConnection = require("./config/database");
const app = require("./app");
// handle undefined routes (should come before error handler)

// app.all("*", (req, res) => {
//   res.status(404).json({
//     status: 404,
//     message: `Can't find this route: ${req.originalUrl}`,
//   });
// });

// Connect with db
dbConnection();

// listen to your project
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  // error outside express
  console.error(`"Unhandled Rejection at: ${err.name} || ${err.message}"`);
  // close server before exit
  server.close(() => {
    console.log("shutting down...");
    process.exit(1);
  });
});

// start tomorrow from 68 youtube 70 udemy
// Insert & Delete Products Dummy Data Using Seeder Script
