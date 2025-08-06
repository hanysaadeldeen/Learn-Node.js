const { check, param } = require("express-validator");
const validationRouter = require("../../middlewares/validatorMiddleWare");

exports.getProjectValidator = [
  param("id")
    .notEmpty()
    .withMessage("Id is require")
    .isMongoId()
    .withMessage("this id is'nt true"),
  validationRouter,
];

exports.createProjectValidator = [
  check("title")
    .notEmpty()
    .withMessage("title is require mr Hany")
    .isLength({ min: 3 })
    .withMessage("title To small")
    .isLength({ max: 20 })
    .withMessage("to long"),
  check("author").notEmpty().withMessage("author is require"),
  validationRouter,
];

exports.updateAndDeleteProjectValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("this id not valid"),
  validationRouter,
];
