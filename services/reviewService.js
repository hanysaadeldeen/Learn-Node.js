const asyncHandler = require("express-async-handler");
const ReviewModel = require("../models/reviewModel");
const AppError = require("../utils/AppError");
const { GetDocs } = require("./handlersFactory");

// nested route
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

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
exports.CreateReviewNested = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
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

exports.GetReviewsOnProductNested = GetDocs(ReviewModel);
exports.GetReviewsOnProduct = asyncHandler(async (req, res, next) => {
  const review = await ReviewModel.find({
    product: req.params.id,
  });

  if (!review) {
    return next(new AppError("cant't find this id", 404));
  }

  res.status(200).json({ message: "success", data: review });
});
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

  // Trigger "save" or "countAverageOnProduct" event when update document
  // await ReviewModel.countAverageOnProduct(review.product);
  review.save();
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

exports.deleteReveiwNested = asyncHandler(async (req, res, next) => {
  const { reveiwId } = req.params;

  const reviews = await ReviewModel.findByIdAndDelete(reveiwId);
  if (!reviews) {
    return next(new AppError("Can not get delete Review rightNow", 404));
  }

  res.status(201).json({ message: "deleted Success" });
});
