const { check } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");
const CouponModel = require("../../models/couponModel");
const AppError = require("../AppError");

exports.createCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("Coupon name is required")
    .isString()
    .withMessage("Coupon name must be a string")
    .custom(async (val) => {
      const existingCoupon = await CouponModel.findOne({ name: val });
      if (existingCoupon) {
        throw new AppError("Coupon name already exists", 400);
      }
      return true;
    }),

  check("discount")
    .notEmpty()
    .withMessage("Discount value is required")
    .isNumeric()
    .withMessage("Discount must be a number")
    .custom((val) => {
      if (val <= 0 || val > 100) {
        throw new AppError("Discount must be between 1 and 100", 400);
      }
      return true;
    }),

  check("expire")
    .notEmpty()
    .withMessage("Expire date is required")
    .custom((val) => {
      const expireDate = new Date(val);

      if (isNaN(expireDate.getTime())) {
        throw new AppError(
          "Expire must be a valid date format (YYYY-MM-DD)",
          400
        );
      }

      const now = Date.now();
      if (expireDate.getTime() <= now) {
        throw new AppError("Expire date must be in the future", 400);
      }

      return true;
    }),
  validatorMiddleWare,
];
