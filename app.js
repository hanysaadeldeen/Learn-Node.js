const path = require("path");

const express = require("express");
const morgan = require("morgan");
const qs = require("qs");
const cors = require("cors");

const { query, validationResult } = require("express-validator");
const routes = require("./routes/index");

const { globalError } = require("./middlewares/errorMiddleWare");
const globalErrorHandler = require("./services/errorController");
const app = express();

app.use(cors());
// middleWares
app.use(express.json());
// for static image

app.use(express.static(path.join(__dirname, "uploads")));

app.set("query parser", (str) => qs.parse(str));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1", routes);

app.use(globalErrorHandler);

app.get("/hello", query("person").notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }
  res.send({ errors: result.mapped() });
});
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to My Project" });
});

app.use(globalError);

module.exports = app;
