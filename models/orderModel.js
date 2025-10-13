const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must be belong to user"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        color: String,
      },
    ],
    totalOrderPrice: {
      type: Number,
      default: 0,
    },
    totalPriceAfterDiscount: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: ["VisaCard", "cash"],
      default: "cash",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    orderStatus: {
      type: String,
      default: "pending",
    },
    deliveredAt: Date,
    paidAt: Date,
    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email phone profilePhoto",
  }).populate({
    path: "cartItems.product",
    select: "title imgCover priceAfter priceBefore",
  });
  next();
});
const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
