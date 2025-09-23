const express = require("express");
const {
  CreateReview,
  GetReviewsOnProduct,
  updateReveiw,
  deleteReveiw,
} = require("../services/reviewService");
const { protect, allowedTo } = require("../services/authService");
const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/Validator/reviewValidator");

const router = express.Router();
router.use(protect);
router
  .route("/:id")
  .get(GetReviewsOnProduct)
  .post(allowedTo(["user"]), createReviewValidator, CreateReview)
  .put(allowedTo(["user"]), updateReviewValidator, updateReveiw);
router.delete("/", allowedTo(["user"]), deleteReviewValidator, deleteReveiw);
module.exports = router;
