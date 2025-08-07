const express = require("express");

const {
  getSpecificSubCategories,
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");

const router = express.Router();

const {
  createSubCategoryValidator,
  checkUniqueSubCategory,
  getSubCategoriesValidator,
} = require("../utils/Validator/subCategoryValidator");

router
  .route("/:categoryId")
  .get(getSubCategoriesValidator, getSpecificSubCategories)
  .put(getSubCategoriesValidator, updateSubCategory)
  .delete(getSubCategoriesValidator, deleteSubCategory);

router
  .route("/")
  .post(createSubCategoryValidator, checkUniqueSubCategory, createSubCategory)
  .get(getAllSubCategories);

module.exports = router;
