const { check } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.createReviewValidator = [
  check("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isString()
    .withMessage("user name must be letters"),
  check("rating")
    .notEmpty()
    .withMessage("rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating must be between 1 and 5"),
  validatorMiddleWare,
];
