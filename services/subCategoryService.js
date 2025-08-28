const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const ApiFeature = require("../utils/apiFeature");
const {
  DeleteDoc,
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
} = require("./handlersFactory");

exports.setCategoryIdtoBody = (req, res, next) => {
  if (req.params.categoryId) req.body.category = req.params.categoryId;
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

exports.getAllSubCategories = asyncHandler(async (req, res) => {
  let filterForCategory = {};
  if (req.params.categoryId) {
    filterForCategory = { category: req.params.categoryId };
  }
  const countDoc = await subCategoryModel.countDocuments();
  const apiFeature = new ApiFeature(
    subCategoryModel.find(filterForCategory),
    req.query
  )
    .paginate(countDoc)
    .search()
    .sort();

  const { query, paginationResult } = apiFeature;
  const subCategories = await query;

  res.status(200).json({
    length: subCategories.length,
    paginationResult,
    subCategory: subCategories,
  });
});

// @desc    Update specific subcategories
// @route   PUT /api/v1/subcategories/:id
// @access  Private

exports.updateSubCategory = UpdateDoc(subCategoryModel);

// @desc    Delete specific subcategories
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = DeleteDoc(subCategoryModel);
