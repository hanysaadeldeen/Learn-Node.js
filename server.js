const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const dbConnection = require("./config/database");
const projectRoute = require("./routes/ProjectRoute");

// Connect with db
dbConnection();
// express app
const app = express();

// middleWares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`"Server mode ${process.env.NODE_ENV}`);
}

// routes
app.use("/api/v1/projects", projectRoute);

// listen to your project
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`"Server is running on port ${PORT}`);
});
