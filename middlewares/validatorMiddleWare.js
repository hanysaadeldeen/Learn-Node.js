const { validationResult } = require("express-validator");
const validationRouter = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({ error: error.array() });
  }
  next();
};

module.exports = validationRouter;
