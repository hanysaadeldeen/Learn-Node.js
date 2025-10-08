const express = require("express");
const router = express.Router();

const { protect, allowedTo } = require("../services/authService");
const {
  addProductToCart,
  getLogedUserCart,
  deleteSpecificCartItems,
  clearLoggedUser,
} = require("../services/cartService");

router.use(protect, allowedTo(["user"]));

router.route("/:productId").post(addProductToCart);

router.delete("/item", deleteSpecificCartItems);
router.route("/").get(getLogedUserCart).delete(clearLoggedUser);

module.exports = router;
