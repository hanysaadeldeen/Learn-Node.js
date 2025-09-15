const { check, param } = require("express-validator");
const bcrypt = require("bcryptjs");

const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");
const UserModel = require("../../models/userModel");
const AppError = require("../AppError");
const slugify = require("slugify");

// const UserModel
exports.signUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isString()
    .withMessage("user name must be letters")
    .isLength({ min: 2, max: 20 })
    .withMessage("user name must be at least 2 characters and max is 20")
    .custom((val, { req }) => {
      req.body.slug = slugify(val, { lower: true });
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("this user email already exists"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm is required")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new AppError("passwordConfirmation didn't math password", 400);
      }
      return true;
    }),

  check("profilePhoto")
    .optional()
    .isString()
    .withMessage("user profile Photo must be a string (URL or filename)"),

  validatorMiddleWare,
];
