const { check, param } = require("express-validator");
const bcrypt = require("bcryptjs");

const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");
const UserModel = require("../../models/userModel");
const AppError = require("../AppError");
// const UserModel
exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isString()
    .withMessage("user name must be letters")
    .isLength({ min: 2, max: 20 })
    .withMessage("user name must be at least 2 characters and max is 20"),
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
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("phone number must be egypt number or saudi number"),
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
  check("name")
    .optional()
    .isString()
    .withMessage("user name must be letters")
    .isLength({ min: 2, max: 20 })
    .withMessage("user name must be at least 2 characters and max is 20"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("invalid email format")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("this user email already exists"));
        }
      })
    ),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("phone number must be egypt number or saudi number"),
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

exports.updateUserPasswordValidator = [
  param("id").notEmpty().withMessage("user Id is required"),
  check("id").isMongoId().withMessage("this is not supported user Id"),

  check("password").notEmpty().withMessage("user password is required"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("user confirmPassword is required")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new AppError("passwordConfirmation didn't math password", 400);
      }
      return true;
    }),
  check("currentPassword")
    .notEmpty()
    .withMessage("currentPassword is required")
    .custom(async (val, { req }) => {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        throw new AppError("there is no user for this id", 404);
      }
      const isCorrectPassword = await bcrypt.compare(val, user.password);
      if (!isCorrectPassword) {
        throw new AppError("current password is wrong", 400);
      }
      return true;
    }),

  validatorMiddleWare,
];
