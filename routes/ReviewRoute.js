const express = require("express");
const {
  CreateReview,
  CreateReviewNested,
  GetReviewsOnProduct,
  GetReviewsOnProductNested,
  updateReveiw,
  deleteReveiw,
  createFilterObj,
} = require("../services/reviewService");
const { protect, allowedTo } = require("../services/authService");
const {
  createReviewValidator,
  createReviewValidatorNested,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/Validator/reviewValidator");

const router = express.Router({ mergeParams: true });
router.use(protect);

// fot nested route
router
  .route("/")
  .get(createFilterObj, GetReviewsOnProductNested)
  .post(allowedTo(["user"]), createReviewValidatorNested, CreateReviewNested);

// for regular route
router
  .route("/:id")
  .get(GetReviewsOnProduct)
  .post(allowedTo(["user"]), createReviewValidator, CreateReview)
  .put(allowedTo(["user"]), updateReviewValidator, updateReveiw);

router.delete(
  "/",
  allowedTo(["user", "manager"]),
  deleteReviewValidator,
  deleteReveiw
);
module.exports = router;
