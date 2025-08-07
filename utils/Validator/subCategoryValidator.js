const { check, param } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorMiddleWare"); // أتأكد أنك مأمنه صح

exports.createSubCategoryValidator = [
  check("category")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("this is not supported category ID"),
  check("title")
    .notEmpty()
    .withMessage("SubCategory title is required")
    .isLength({ min: 3 })
    .withMessage("Too short subCategory title")
    .isLength({ max: 20 })
    .withMessage("Too large subCategory title"),

  check("type")
    .notEmpty()
    .withMessage("SubCategory type is required")
    .isLength({ min: 3 })
    .withMessage("Too short subCategory type")
    .isLength({ max: 20 })
    .withMessage("Too large subCategory type"),

  validatorMiddleWare,
];
exports.getSubCategoriesValidator = [
  param("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("this is not supported category ID"),
  validatorMiddleWare,
];
const SubCategoryModel = require("../../models/subCategoryModel");

exports.checkUniqueSubCategory = async (req, res, next) => {
  const { type } = req.body;

  const existing = await SubCategoryModel.findOne({
    $or: [{ type }],
  });

  if (existing) {
    return res.status(400).json({
      error: "SubCategory  type must be unique",
    });
  }

  next();
};
