const {
  createCategory,
  getCategories,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const {
  GetCategoryValidator,
  UpdateCategoryValidator,
  DeleteCategoryValidator,
  CreateCategoryValidator,
} = require("../utils/Validator/categoryValidator");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(CreateCategoryValidator, createCategory);
router
  .route("/:id")
  .get(GetCategoryValidator, getSpecificCategory)
  .put(UpdateCategoryValidator, updateCategory)
  .delete(DeleteCategoryValidator, deleteCategory);
module.exports = router;

// start tomorrow from 47
