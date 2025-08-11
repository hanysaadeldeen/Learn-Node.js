const { check } = require("express-validator");
const validationRouter = require("../../middlewares/validatorMiddleWare");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters")
    .isLength({ max: 30 })
    .withMessage("Product title must be at most 30 characters"),

  check("priceBefore")
    .notEmpty()
    .withMessage("Price before discount is required")
    .isFloat({ min: 1 })
    .withMessage("Price before discount must be greater than 0"),

  check("priceAfter")
    .notEmpty()
    .withMessage("Price after discount is required")
    .isFloat({ min: 1 })
    .withMessage("Price after discount must be greater than 0")
    .custom((value, { req }) => {
      if (parseFloat(value) > parseFloat(req.body.priceBefore)) {
        throw new Error(
          "Price after discount must be less than price before discount"
        );
      }
      return true;
    }),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters")
    .isLength({ max: 300 })
    .withMessage("Description must be at most 300 characters"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid Category ID format"),

  check("brand")
    .notEmpty()
    .withMessage("Brand is required")
    .isMongoId()
    .withMessage("Invalid Brand ID format"),

  validationRouter,
];
