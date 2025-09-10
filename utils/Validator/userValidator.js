const { check, param } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is requireddd")
    .isString()
    .withMessage("user name must be letters")
    .isLength({ min: 2, max: 20 })
    .withMessage("user name must be at least 2 characters and max is 20"),
  check("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("invalid email format")
    .isLowercase()
    .withMessage("email must be lowercase"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  check("phone")
    .notEmpty()
    .withMessage("user phone is required")
    .isLength({ min: 6 })
    .withMessage("user phone must be at least 6 numbers")
    .isLength({ max: 15 })
    .withMessage("user phone must not be more than 15 numbers"),
  check("phone")
    .notEmpty()
    .withMessage("user phone is required")
    .isLength({ min: 6, max: 15 })
    .withMessage("phone must be between 6 and 15 digits")
    .isNumeric()
    .withMessage("phone must contain only numbers"),
  check("profilePhoto")
    .optional()
    .isString()
    .withMessage("user profile Photo must be a string (URL or filename)"),
  check("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("role must be either 'admin' or 'user'"),
  validatorMiddleWare,
];

exports.updateAndUnActiveUserValidator = [
  param("id").notEmpty().withMessage("user Id is required"),
  check("id").isMongoId().withMessage("this is not supported user Id"),
  validatorMiddleWare,
];
