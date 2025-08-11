const { check, param } = require("express-validator");

const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.createBrandValidator = [
  check("title")
    .notEmpty()
    .withMessage("Brand title is required")
    .isLength({ min: 3 })
    .withMessage("Brand title must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("Brand title must not be more than 20 characters"),
  validatorMiddleWare,
];

exports.getSpecificBrandValidator = [
  param("brandId").notEmpty().withMessage("brand Id is required"),
  check("brandId").isMongoId().withMessage("this is not supported brand Id"),
  validatorMiddleWare,
];

exports.updateSpecificBrandValidator = [
  param("brandId").notEmpty().withMessage("brand Id is required"),
  check("brandId").isMongoId().withMessage("this is not supported brand Id"),
  validatorMiddleWare,
];

exports.deleteSpecificBrandValidator = [
  param("brandId").notEmpty().withMessage("brand Id is required"),
  check("brandId").isMongoId().withMessage("this is not supported brand Id"),
  validatorMiddleWare,
];
