const express = require("express");

const {
  getSpecificSubCategories,
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdtoBody
} = require("../services/subCategoryService");

const router = express.Router({mergeParams:true});

const {
  createSubCategoryValidator,
  checkUniqueSubCategory,
  getSubCategoriesValidator,
} = require("../utils/Validator/subCategoryValidator");



router
  .route("/")
  .post(setCategoryIdtoBody,createSubCategoryValidator, checkUniqueSubCategory, createSubCategory)
  .get(getAllSubCategories);
  
router
  .route("/:categoryId")
  .get(getSubCategoriesValidator, getSpecificSubCategories)
  .put(getSubCategoriesValidator, updateSubCategory)
  .delete(getSubCategoriesValidator, deleteSubCategory);



module.exports = router;
