const { check, param } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorMiddleWare"); // أتأكد أنك مأمنه صح

exports.createSubCategoryValidator = [
  // ✅ التحقق من categoryId من الـ URL params
  param("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),

  // ✅ التحقق من title من الـ body
  check("title")
    .notEmpty()
    .withMessage("SubCategory title is required")
    .isLength({ min: 3 })
    .withMessage("Too short subCategory title")
    .isLength({ max: 20 })
    .withMessage("Too large subCategory title"),

  // ✅ التحقق من type من الـ body
  check("type")
    .notEmpty()
    .withMessage("SubCategory type is required")
    .isLength({ min: 3 })
    .withMessage("Too short subCategory type")
    .isLength({ max: 20 })
    .withMessage("Too large subCategory type"),

  // ✅ الميدل وير اللي بيطبع الأخطاء
  validatorMiddleWare,
];
const SubCategoryModel = require("../../models/subCategoryModel");

exports.checkUniqueSubCategory = async (req, res, next) => {
  const { title, type } = req.body;

  const existing = await SubCategoryModel.findOne({
    $or: [{ title }, { type }],
  });

  if (existing) {
    return res.status(400).json({
      error: "SubCategory title or type must be unique",
    });
  }

  next();
};
