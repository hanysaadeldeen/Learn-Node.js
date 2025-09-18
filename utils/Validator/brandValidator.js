const { check, param } = require("express-validator");
const slugify = require("slugify");

const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.createBrandValidator = [
  check("title")
    .notEmpty()
    .withMessage("Brand title is required")
    .isLength({ min: 3 })
    .withMessage("Brand title must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("Brand title must not be more than 20 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val, { lower: true });
      return true;
    }),
  ,
  validatorMiddleWare,
];

exports.getSpecificBrandValidator = [
  param("id").notEmpty().withMessage("brand Id is required"),
  check("id").isMongoId().withMessage("this is not supported brand Id"),
  validatorMiddleWare,
];

exports.updateSpecificBrandValidator = [
  param("id").notEmpty().withMessage("brand Id is required"),
  check("id").isMongoId().withMessage("this is not supported brand Id"),
  validatorMiddleWare,
];

exports.deleteSpecificBrandValidator = [
  param("id").notEmpty().withMessage("brand Id is required"),
  check("id").isMongoId().withMessage("this is not supported brand Id"),
  validatorMiddleWare,
];
