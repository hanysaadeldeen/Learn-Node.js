const express = require("express");
const {
  CreateReview,
  GetReviewsOnProduct,
} = require("../services/reviewService");
const { protect, allowedTo } = require("../services/authService");
const { createReviewValidator } = require("../utils/Validator/reviewValidator");

const router = express.Router();
// router.use(protect, allowedTo(["user"]));
router
  .route("/:id")
  .post(createReviewValidator, CreateReview)
  .get(GetReviewsOnProduct);
module.exports = router;
