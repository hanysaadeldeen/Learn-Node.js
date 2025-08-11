const { check,param } = require("express-validator");
const validationRouter = require("../../middlewares/validatorMiddleWare");

exports.createProductValidator = [
// Title
  check("title")
    .notEmpty().withMessage("Product title is required")
    .isLength({ min: 3 }).withMessage("Product title must be at least 3 characters")
    .isLength({ max: 30 }).withMessage("Product title must be at most 30 characters"),

  // Slug
  check("slug")
    .notEmpty().withMessage("Product slug is required"),

  // Price Before
  check("priceBefore")
    .notEmpty().withMessage("Price before discount is required")
    .isFloat({ gt: 0 }).withMessage("Price before discount must be greater than 0"),

  // Price After
  check("priceAfter")
    .notEmpty().withMessage("Price after discount is required")
    .isFloat({ gt: 0 }).withMessage("Price after discount must be greater than 0")
    .custom((value, { req }) => {
      if (parseFloat(value) > parseFloat(req.body.priceBefore)) {
        throw new Error("Price after discount must be less than price before discount");
      }
      return true;
    }),

  // Description
  check("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 3 }).withMessage("Description must be at least 3 characters")
    .isLength({ max: 300 }).withMessage("Description must be at most 300 characters"),

  // imgCover
  check("imgCover")
    .optional()
    .isString().withMessage("Image cover must be a string (URL or filename)"),

  // images
  check("images")
    .optional()
    .isArray().withMessage("Images must be an array of strings"),

  // colors
  check("colors")
    .optional()
    .isArray().withMessage("Colors must be an array of strings"),

  // quantity
  check("quantity")
    .notEmpty().withMessage("Product quantity is required")
    .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),

  // sold
  check("sold")
    .optional()
    .isInt({ min: 0 }).withMessage("Sold must be a non-negative integer"),

  // ratingAverage
  check("ratingAverage")
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),

  // ratingCount
  check("ratingCount")
    .optional()
    .isInt({ min: 0 }).withMessage("Rating count must be a non-negative integer"),

  // category
  check("category")
    .notEmpty().withMessage("Category is required")
    .isMongoId().withMessage("Invalid Category ID format"),

  // subCategory
  check("subCategory")
    .optional()
    .isArray().withMessage("SubCategory must be an array of IDs")
    .custom((arr) => {
      arr.forEach(id => {
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
          throw new Error(`Invalid SubCategory ID format: ${id}`);
        }
      });
      return true;
    }),

  // brand
  check("brand")
    .optional()
    .isMongoId().withMessage("Invalid Brand ID format"),

  validationRouter,
];



exports.updateProductValidator = [
  param("productId").notEmpty().withMessage("productId Id is required"),
  check("productId").isMongoId().withMessage("productId is not supported productId"),
  validationRouter,
];

exports.deleteProductValidator = [
  param("productId").notEmpty().withMessage("productId Id is required"),
  check("productId").isMongoId().withMessage("this is not supported productId"),
  validationRouter,
];