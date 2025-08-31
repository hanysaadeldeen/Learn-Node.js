const express = require("express");

const {
  getSpecificSubCategories,
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdtoBody,
  createFilterObj,
} = require("../services/subCategoryService");

const router = express.Router({ mergeParams: true });

const {
  createSubCategoryValidator,
  checkUniqueSubCategory,
  getSubCategoriesValidator,
} = require("../utils/Validator/subCategoryValidator");

router
  .route("/")
  .post(
    setCategoryIdtoBody,
    createSubCategoryValidator,
    checkUniqueSubCategory,
    createSubCategory
  )
  .get(createFilterObj, getAllSubCategories);

router
  .route("/:id")
  .get(getSubCategoriesValidator, getSpecificSubCategories)
  .put(getSubCategoriesValidator, updateSubCategory)
  .delete(getSubCategoriesValidator, deleteSubCategory);

module.exports = router;
