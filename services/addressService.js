const asynchandler = require("express-async-handler");
const UserModel = require("../models/userModel");

// @desc    Add address to user
// @route   POST /api/v1/address
// @access  Protected/User
exports.addUserAddress = asynchandler(async (req, res, next) => {
  // $addToSet => add productId to wishlist array if productId not exist

  const { alias, details, phone, city, postalCode } = req.body;
  const response = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        address: {
          alias,
          details,
          phone,
          city,
          postalCode,
        },
      },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "address successfully Added.",
    address: response.address,
  });
});

// @desc    Remove address from User
// @route   DELETE /api/v1/address/:addressId
// @access  Protected/User
exports.deleteAddressUser = asynchandler(async (req, res, next) => {
  // $pull => remove productId from wishlist array if productId exist
  const response = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { address: { _id: req.params.addressId } },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "address removed successfully from Users",
    address: response.address,
  });
});

// @desc    Get logged user address
// @route   GET /api/v1/address
// @access  Protected/User
exports.getUserWishList = asynchandler(async (req, res, next) => {
  const response = await UserModel.findById(req.user._id).populate("wishlist");
  res.status(200).json({
    status: "success",
    results: response.wishlist.length,
    wishlist: response.wishlist,
  });
});

// @desc    Get logged user address list
// @route   GET /api/v1/address
// @access  Protected/User
exports.getLoggedUserAddresses = asynchandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate("address");

  res.status(200).json({
    status: "success",
    results: user.address.length,
    data: user.address,
  });
});
