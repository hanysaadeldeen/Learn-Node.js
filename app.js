const path = require("path");
const express = require("express");
const morgan = require("morgan");
const qs = require("qs");
const cors = require("cors");
// Security Packages
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
const { query, validationResult } = require("express-validator");

const routes = require("./routes/index");
const { globalError } = require("./middlewares/errorMiddleWare");
const globalErrorHandler = require("./services/errorController");

const app = express();

// Enable CORS
app.use(cors());
// Parse JSON with limit
app.use(express.json({ limit: "50kb" }));
// !Data Sanitization against NoSQL Injection
// app.use(
//   mongoSanitize({
//     allowDots: true,
//     replaceWith: "_",
//   })
// );

// app.use(xss());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// Static Files
app.use(express.static(path.join(__dirname, "uploads")));

// Custom Query Parser
app.set("query parser", (str) => qs.parse(str));
app.use(hpp());
// Logger (only in dev mode)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Main Routes
app.use("/api/v1", routes);

// Example route with validation
app.get("/hello", query("person").notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }
  res.send({ errors: result.mapped() });
});

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to My Project" });
});

// Global Error Handlers
app.use(globalErrorHandler);
app.use(globalError);

module.exports = app;
