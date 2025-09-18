const express = require("express");

const {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
  getSpecificProductValidator,
} = require("../utils/Validator/productValidator");
const { protect, allowedTo } = require("../services/authService");

const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/ProductService");
const {
  ProcessingImgesFiles,
  UploadImagesfileds,
} = require("../services/handlersFactory");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    protect,
    allowedTo(["admin", "manager"]),
    UploadImagesfileds,
    ProcessingImgesFiles(),
    createProductValidator,
    createProduct
  )
  .get(getAllProducts);

router
  .route("/:id")
  .get(getSpecificProductValidator, getProduct)
  .put(
    protect,
    allowedTo(["admin", "manager"]),
    UploadImagesfileds,
    ProcessingImgesFiles(),
    updateProductValidator,
    updateProduct
  )
  .delete(
    protect,
    allowedTo(["admin", "manager"]),
    deleteProductValidator,
    deleteProduct
  );
module.exports = router;
