const express = require("express");

const {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
  getSpecificProductValidator,
} = require("../utils/Validator/productValidator");
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
    UploadImagesfileds,
    ProcessingImgesFiles(),
    updateProductValidator,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);
module.exports = router;
