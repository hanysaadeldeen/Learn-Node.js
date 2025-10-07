const asynchandler = require("express-async-handler");
const CartModel = require("../models/cartModel");
const ProductModel = require("../models/ProductModel");
const AppError = require("../utils/AppError");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

// @desc    Add product to  cart
// @route   POST /api/v1/cart
// @access  Private/User
exports.addProductToCart = asynchandler(async (req, res, next) => {
  const { productId } = req.params;
  const { color } = req.body;
  const userId = req.user._id;

  const currentProduct = await ProductModel.findById(productId);

  // 1) Get Cart for logged user
  let cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    // create cart fot logged user with product
    cart = await CartModel.create({
      cartItems: [
        { product: productId, price: currentProduct.priceAfter, color },
      ],
      user: userId,
    });
  } else {
    const productIndex = cart.cartItems.findIndex((item) => {
      return item.color === color && item.product.toString() === productId;
    });
    if (productIndex > -1) {
      cart.cartItems[productIndex].quantity += 1;
    } else {
      // product not exist in cart,  push product to cartItems array
      cart.cartItems.push({
        product: productId,
        price: currentProduct.priceAfter,
        color,
      });
    }
  }

  cart.totalCartPrice = calcTotalCartPrice(cart);

  cart.save();

  res.status(201).json({
    status: "success",
    data: cart,
    numOfCartItems: cart.cartItems.length,
  });
});

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Private/User

exports.getLogedUserCart = asynchandler(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart || cart.cartItems.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "Your cart is empty",
      cartItems: [],
      numOfCartItems: 0,
    });
  }
  res.status(200).json({
    data: "success",
    cartItems: cart.cartItems,
    numOfCartItems: cart.cartItems.length,
  });
});
