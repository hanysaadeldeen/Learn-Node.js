const express = require("express");

const {
  createProductValidator,
} = require("../utils/Validator/productValidator");
const { createProduct, getAllProducts } = require("../services/ProductService");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(createProductValidator, createProduct)
  .get(getAllProducts);
module.exports = router;
