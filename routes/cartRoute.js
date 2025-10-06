const express = require("express");
const router = express.Router();

const { protect, allowedTo } = require("../services/authService");
const { addProductToCart } = require("../services/cartService");

router.use(protect, allowedTo(["user"]));

router.route("/").get(addProductToCart);

module.exports = router;
