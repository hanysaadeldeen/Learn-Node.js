const { check } = require("express-validator");

const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");
exports.GetCategoryValidator = [
  check("id").isMongoId().withMessage("this is not supported category IDYo"),
  validatorMiddleWare,
];

exports.CreateCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category Title is required")
    .isString()
    .withMessage("category must be string")
    .isLength({ min: 3 })
    .withMessage("category min Length is 3")
    .isLength({ max: 10 })
    .withMessage("category max length is 10"),
  validatorMiddleWare,
];
exports.UpdateCategoryValidator = [
  check("id").isMongoId().withMessage("this is not supported category IDYo"),
  validatorMiddleWare,
];

exports.DeleteCategoryValidator = [
  check("id").isMongoId().withMessage("this is not supported category IDYo"),
  validatorMiddleWare,
];
