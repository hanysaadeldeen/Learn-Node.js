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
// exports.GetReviewsOnProduct = asyncHandler(async (req, res, next) => {
//   const productId = req.params.id;
//   const reviews = await ReviewModel.find({ product: productId }).populate(
//     "user"
//   );
//   if (!reviews) {
//     return next(new AppError("Can not get ProductReview rightNow", 404));
//   }

//   res.status(201).json({ message: "success", data: reviews });
// });
