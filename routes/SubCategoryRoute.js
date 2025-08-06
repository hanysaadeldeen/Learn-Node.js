const express = require("express");

const {
  getSubCategories,
  createSubCategory,
} = require("../services/subCategoryService");
const router = express.Router();

const {
  createSubCategoryValidator,
  checkUniqueSubCategory,
} = require("../utils/Validator/subCategoryValidator");

router
  .route("/:categoryId")
  .get(getSubCategories)
  .post(createSubCategoryValidator, checkUniqueSubCategory, createSubCategory);

module.exports = router;
