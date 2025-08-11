const { check } = require("express-validator");

const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("Brand name must not be more than 20 characters"),
  validatorMiddleWare,
];
