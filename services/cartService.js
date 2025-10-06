const asynchandler = require("express-async-handler");
const CartModel = require("../models/cartModel");

exports.addProductToCart = asynchandler(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const response = await CartModel.findOne({ cartItems });

  res.status(200).json(userId);
});
