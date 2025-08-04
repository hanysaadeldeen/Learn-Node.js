const {
  createCategory,
  getCategories,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const express = require("express");

const router = express.Router();
const { param, query, validationResult } = require("express-validator");

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(
    param("id").isMongoId().withMessage("this is not supported category ID"),
    (req, res) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
    },
    getSpecificCategory
  )
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = router;

// start tomorrow from 45
