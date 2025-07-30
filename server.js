// const express = require("express");
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// dotenv.config({ path: ".env" });

// const dbConnection = require("./config/database");
// const projectRoute = require("./routes/ProjectRoute");
// const categoryRoute = require("./routes/CagetoryRoute");
// // Connect with db
// dbConnection();
// // express app
// const app = express();

// // middleWares
// app.use(express.json());
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
//   console.log(`"Server mode ${process.env.NODE_ENV}`);
// }

// // routes
// app.use("/api/v1/projects", projectRoute);
// app.use("/api/v1/categories", categoryRoute);

// // listen to your project
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`"Server is running on port ${PORT}`);
// });

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
app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`);
});
