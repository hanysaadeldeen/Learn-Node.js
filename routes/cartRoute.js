const express = require("express");
const router = express.Router();

const { protect, allowedTo } = require("../services/authService");
const {
  addProductToCart,
  getLogedUserCart,
} = require("../services/cartService");

router.use(protect, allowedTo(["user"]));

router.route("/:productId").post(addProductToCart);
router.route("/").get(getLogedUserCart);

module.exports = router;
