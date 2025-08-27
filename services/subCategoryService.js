const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const subCategoryModel = require("../models/subCategoryModel");
const ApiFeature = require("../utils/apiFeature");
const { DeleteDoc, UpdateDoc, GetSpecificDoc } = require("./handlersFactory");

exports.setCategoryIdtoBody = (req, res, next) => {
  if (req.params.categoryId) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = asyncHandler(async (req, res) => {
  if (req.params.categoryId) req.body.category = req.params.categoryId;

  const { title, type, category } = req.body;

  const subCategory = await subCategoryModel.create({
    title,
    type,
    slug: slugify(title),
    category,
  });

  res.status(201).json({
    status: "success",
    data: subCategory,
  });
});

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

exports.updateSubCategory = UpdateDoc(subCategoryModel);

exports.deleteSubCategory = DeleteDoc(subCategoryModel);
