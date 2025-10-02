const express = require("express");

const {
  addProductToWishList,
  getUserWishList,
  deleteProductFromWishList,
} = require("../services/wishLishService");

// const {
//   createUserValidator,
//   updateAndUnActiveUserValidator,
//   updateUserPasswordValidator,
//   updateMYPasswordValidator,
//   updateMyProfValidator,
// } = require("../utils/Validator/userValidator");

const router = express.Router();

const { protect, allowedTo } = require("../services/authService");

router.use(protect, allowedTo(["user"]));

router.route("/").post(addProductToWishList).get(getUserWishList);
router.delete("/:productId", deleteProductFromWishList);

module.exports = router;
