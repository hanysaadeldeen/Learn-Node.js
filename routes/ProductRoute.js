const express = require("express");

const {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/Validator/productValidator");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/ProductService");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(createProductValidator, createProduct)

  .get(getAllProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
module.exports = router;
