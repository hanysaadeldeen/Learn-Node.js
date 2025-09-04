const express = require("express");

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

const SubCategoriesRoute = require("./SubCategoryRoute");
const {
  ProcessImgGlobal,
  UploadImgGlobal,
} = require("../services/handlersFactory");

const router = express.Router();

// nested Route for category
router.use("/:categoryId/subcategories", SubCategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    UploadImgGlobal,
    ProcessImgGlobal("category"),
    CreateCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(GetCategoryValidator, getSpecificCategory)
  .put(
    UploadImgGlobal,
    ProcessImgGlobal("category"),
    UpdateCategoryValidator,
    updateCategory
  )
  .delete(DeleteCategoryValidator, deleteCategory);
module.exports = router;
