const asynchandler = require("express-async-handler");
const UserModel = require("../models/userModel");
// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Protected/User
exports.addProductToWishList = asynchandler(async (req, res, next) => {
  const { productId } = req.body;
  // $addToSet => add productId to wishlist array if productId not exist
  const response = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Product added successfully to your wishlist.",
    wishlist: response.wishlist,
  });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Protected/User
exports.deleteProductFromWishList = asynchandler(async (req, res, next) => {
  // $pull => remove productId from wishlist array if productId exist
  const { productId } = req.params;
  const response = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Product removed successfully from your wishlist.",
    wishlist: response.wishlist,
  });
});

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlist
// @access  Protected/User
exports.getUserWishList = asynchandler(async (req, res, next) => {
  const response = await UserModel.findById(req.user._id).populate("wishlist");
  res.status(200).json({
    status: "success",
    results: response.wishlist.length,
    wishlist: response.wishlist,
  });
});
