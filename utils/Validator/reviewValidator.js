const { check, param } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");
const ReviewModel = require("../../models/reviewModel");
const AppError = require("../AppError");
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
  param("id")
    .notEmpty()
    .withMessage("product id is required")
    .custom(async (val, { req }) => {
      if (req.user.role !== "user") {
        throw new AppError("admin can't delete review", 400);
      }
      const isUserAddReview = await ReviewModel.findOne({
        user: req.user._id,
        product: val,
      });
      if (isUserAddReview) {
        throw new AppError("user created review before", 400);
      }
      return true;
    }),

  validatorMiddleWare,
];

exports.updateReviewValidator = [
  check("reviewId")
    .notEmpty()
    .withMessage("reviewId is required")
    .isMongoId()
    .withMessage("this reviewId is wrong")
    .custom(async (val, { req }) => {
      const isReviewExits = await ReviewModel.findById(val);
      if (!isReviewExits) {
        throw new AppError("this review not found", 400);
      }
      // if (isReviewExits.user.toString() !== req.user._id.toString()) {
      if (!isReviewExits.user.equals(req.user._id)) {
        throw new AppError("you are not the one who create reveiw", 400);
      }
    }),
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

exports.deleteReviewValidator = [
  check("reviewId")
    .notEmpty()
    .withMessage("reviewId is required")
    .isMongoId()
    .withMessage("this reviewId is wrong")
    .custom(async (val, { req }) => {
      if (req.user.role !== "user") {
        throw new AppError("admin can't delete review", 400);
      }
      const isReviewExits = await ReviewModel.findById(val);
      if (!isReviewExits) {
        throw new AppError("this review not found", 400);
      }
      if (!isReviewExits.user.equals(req.user._id)) {
        throw new AppError("you are not the one who create reveiw", 400);
      }
    }),
  ,
  validatorMiddleWare,
];
