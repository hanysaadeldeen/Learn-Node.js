const express = require("express");

const { createCashOrder } = require("../services/orderService");
const { protect, allowedTo } = require("../services/authService");
const router = express.Router();

router.use(protect, allowedTo(["user"]));
router.post("/", createCashOrder);

module.exports = router;
