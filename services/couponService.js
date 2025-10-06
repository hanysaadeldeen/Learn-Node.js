const CouponModel = require("../models/couponModel");
const {
  CreateDoc,
  DeleteDoc,
  GetDocs,
  GetSpecificDoc,
  UpdateDoc,
} = require("./handlersFactory");

// @desc    Create coupon
// @route   POST  /api/v1/coupons
// @access  Private/Admin-Manager
exports.addCoupon = CreateDoc(CouponModel);

// @desc    Get list of coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin-Manager
exports.getCoupons = GetDocs(CouponModel);

// @desc    Update specific coupon
// @route   PUT /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.updateCoupon = UpdateDoc(CouponModel);

// @desc    Get specific coupon by id
// @route   GET /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.getSpecificCoupon = GetSpecificDoc(CouponModel);

// @desc    Delete specific coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.deleteCoupon = DeleteDoc(CouponModel);
