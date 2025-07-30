// const asyncHandler = require("express-async-handler");

// exports.AppError = asyncHandler(async (statusCode, message) => {
//   const error = new Error(message);
//   const statusCode = statusCode || 500;
// });

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; //can be changed to false if not operational
  }
}

module.exports = AppError;
