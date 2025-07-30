const express = require("express");
const morgan = require("morgan");

const projectRoute = require("./routes/ProjectRoute");
const categoryRoute = require("./routes/CagetoryRoute");
const AppError = require("./utils/AppError");
const { globalError } = require("./middlewares/errorMiddleWare");

const app = express();
// middleWares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/categories", categoryRoute);

// app.all("*", (req, res, next) => {
//   next(new AppError("router didn't match with any route", 404));
// });

app.use(globalError);

module.exports = app;
