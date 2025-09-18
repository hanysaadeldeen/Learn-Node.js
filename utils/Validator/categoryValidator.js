const { check } = require("express-validator");
const slugify = require("slugify");

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
    .isLength({ max: 50 })
    .withMessage("category max length is 50")
    .custom((val, { req }) => {
      req.body.slug = slugify(val, { lower: true });
      return true;
    }),
  ,
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
