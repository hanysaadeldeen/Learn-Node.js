const asyncHandler = require("express-async-handler");
const ReviewModel = require("../models/reviewModel");
const AppError = require("../utils/AppError");
const { GetDocs } = require("./handlersFactory");

exports.CreateReview = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const { comment, rating } = req.body;
  const { _id: userId } = req.user;
  const review = await ReviewModel.create({
    comment,
    rating,
    user: userId,
    product: productId,
  });

  if (!review) {
    return next(new AppError("Can not Create ProductReview rightNow", 404));
  }

  res.status(201).json({ message: "review created", data: review });
});

exports.GetReviewsOnProduct = GetDocs(ReviewModel);

exports.updateReveiw = asyncHandler(async (req, res, next) => {
  const { comment, rating, reviewId } = req.body;
  const review = await ReviewModel.findByIdAndUpdate(
    reviewId,
    {
      comment,
      rating,
    },
    { new: true }
  );

  if (!review) {
    return next(new AppError("Can not update ProductReview rightNow", 404));
  }

  res.status(201).json({ message: "review updated", data: review });
});

exports.deleteReveiw = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.body;

  const reviews = await ReviewModel.findByIdAndDelete(reviewId);
  if (!reviews) {
    return next(new AppError("Can not get delete Review rightNow", 404));
  }

  res.status(201).json({ message: "deleted Success" });
});
