const express = require("express");

const router = express.Router();

const { protect, allowedTo } = require("../services/authService");
const {
  addCoupon,
  deleteCoupon,
  getCoupons,
  getSpecificCoupon,
  updateCoupon,
} = require("../services/couponService");
const { createCouponValidator } = require("../utils/Validator/couponValidator");
router.use(protect, allowedTo(["admin", "manager"]));

router.route("/").post(createCouponValidator, addCoupon).get(getCoupons);
router
  .route("/:id")
  .delete(deleteCoupon)
  .get(getSpecificCoupon)
  .put(updateCoupon);
module.exports = router;
