const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Coupon name required"],
      unique: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: [true, "Coupon discount value required"],
    },
    expire: {
      type: Date,
      required: [true, "Coupon expire time required"],
    },
  },
  { timestamps: true }
);

const CouponModel = mongoose.model("Coupon", CouponSchema);

module.exports = CouponModel;
