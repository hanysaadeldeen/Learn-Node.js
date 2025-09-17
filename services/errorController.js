const AppError = require("../utils/AppError");

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `${field} '${value}' already exists. Please use another ${field}.`;
  return new AppError(message, 400);
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Mongo duplicate key error
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    err.message = "Please log in again!";
    // next();
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
