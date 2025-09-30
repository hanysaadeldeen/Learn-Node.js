const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const ApiFeature = require("../utils/apiFeature");
const {
  DeleteDoc,
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
  GetDocs,
} = require("./handlersFactory");

// Nested route
exports.setCategoryIdtoBody = (req, res, next) => {
  if (req.params.categoryId) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
// @create  subcategories
// @route  post /api/subcategories
// @access private
exports.createSubCategory = CreateDoc(subCategoryModel);

// @desc    Get specific subcategories by id
// @route   GET /api/v1/subcategories/:id
// @access  Public

exports.getSpecificSubCategories = GetSpecificDoc(subCategoryModel, {
  field: "category",
  populate: { path: "category", select: "name-_id" },
});

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories and With ID
// @access  Public

exports.getAllSubCategories = GetDocs(subCategoryModel);

// @desc    Update specific subcategories
// @route   PUT /api/v1/subcategories/:id
// @access  Private

exports.updateSubCategory = UpdateDoc(subCategoryModel);

// @desc    Delete specific subcategories
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = DeleteDoc(subCategoryModel);
