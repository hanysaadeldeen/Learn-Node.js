const {
  createCategory,
  getCategories,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const express = require("express");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(getSpecificCategory)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = router;
