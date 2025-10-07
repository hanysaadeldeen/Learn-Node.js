const { string } = require("joi");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
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
        price: Number,
        color: String,
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalCartPrice: {
      type: Number,
      default: 0,
    },
    totalPriceAfterDiscount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
