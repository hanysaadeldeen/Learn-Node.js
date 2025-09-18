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
const { protect, allowedTo } = require("../services/authService");

const {
  createSubCategoryValidator,
  checkUniqueSubCategory,
  getSubCategoriesValidator,
} = require("../utils/Validator/subCategoryValidator");

router
  .route("/")
  .post(
    protect,
    allowedTo(["admin", "manager"]),
    setCategoryIdtoBody,
    createSubCategoryValidator,
    checkUniqueSubCategory,
    createSubCategory
  )
  .get(createFilterObj, getAllSubCategories);

router
  .route("/:id")
  .get(getSubCategoriesValidator, getSpecificSubCategories)
  .put(protect, getSubCategoriesValidator, updateSubCategory)
  .delete(
    allowedTo(["admin", "manager"]),
    getSubCategoriesValidator,
    deleteSubCategory
  );

module.exports = router;
