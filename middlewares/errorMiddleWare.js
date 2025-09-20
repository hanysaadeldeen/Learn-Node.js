// global error handling middleware (should come last)
exports.globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  if (err.name === "JsonWebTokenError") {
    err.message = "Please login again!";
    next();
  }
  res.status(err.statusCode).json({
    status: err.statusCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
