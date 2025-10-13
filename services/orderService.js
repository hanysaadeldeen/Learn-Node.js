const asynchandler = require("express-async-handler");
const OrderModel = require("../models/orderModel");
const CartModel = require("../models/cartModel");
const ProductModel = require("../models/ProductModel");
const AppError = require("../utils/AppError");

exports.createCashOrder = asynchandler(async (req, res, next) => {
  const { paymentMethodType, taxPrice, shippingPrice } = req.body;

  // 1) Get Cart for logged user
  const userId = req.user._id;
  const cart = await CartModel.findOne({ user: userId });
  if (!cart || cart.cartItems.length === 0) {
    return next(new AppError("Your cart is empty", 400));
  }

  // 2) Create order with default paymentMethodType cash
  const order = await OrderModel.create({
    user: userId,
    cartItems: cart.cartItems,
    totalOrderPrice: cart.totalCartPrice,
    totalPriceAfterDiscount: cart.totalPriceAfterDiscount,
    paymentMethodType,
    shippingPrice: shippingPrice || 0,
    taxPrice: taxPrice || 0,
  });

  // 3) After creating order, decrement product quantity, increment sold, clear cart
  if (order) {
    const bulkOptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await ProductModel.bulkWrite(bulkOptions, {});
    // 4) Clear cart depend on cartId
    await CartModel.findByIdAndDelete(cart._id);
  }

  res.status(201).json({
    status: "order created successfully",
    order,
  });
});
