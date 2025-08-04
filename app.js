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
const { param, query, validationResult } = require("express-validator");
// app.get("/hello", query("person").notEmpty(), (req, res) => {
//   res.send(`Hello, ${req.query.person}!`);
// });

app.get("/hello", query("person").notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }
  res.send({ errors: result.mapped() });
});

// app.all("*", (req, res, next) => {
//   next(new AppError("router didn't match with any route", 404));
// });

app.use(globalError);

module.exports = app;
