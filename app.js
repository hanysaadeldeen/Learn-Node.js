const express = require("express");
const morgan = require("morgan");
const qs = require("qs");
const { query, validationResult } = require("express-validator");
const categoryRoute = require("./routes/CagetoryRoute");
const SubCategoryRoute = require("./routes/SubCategoryRoute");
const ProductRoute = require("./routes/ProductRoute");
const BrandRoute = require("./routes/BrandRoute");
const { globalError } = require("./middlewares/errorMiddleWare");

const app = express();
// middleWares
app.use(express.json());
app.set("query parser", (str) => qs.parse(str));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", SubCategoryRoute);
app.use("/api/v1/brand", BrandRoute);
app.use("/api/v1/product", ProductRoute);

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
