const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const subCategoryModel = require("../models/subCategoryModel");
const ApiFeature = require("../utils/apiFeature");

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
exports.getSpecificSubCategories = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const subCategories = await subCategoryModel
    .find({ category: categoryId })
    .populate({ path: "category", select: "name-_id" });
  res
    .status(200)
    .json({ length: subCategories.length, subCategory: subCategories });
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

exports.updateSubCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const updateData = { ...req.body };

  if (updateData.title) {
    updateData.slug = slugify(updateData.title);
  }
  const subCategory = await subCategoryModel.findByIdAndUpdate(
    categoryId,
    updateData,
    { new: true }
  );
  res.status(201).json({
    status: "success",
    data: subCategory,
    length: subCategory.length,
  });
});

exports.deleteSubCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const response = await subCategoryModel.findByIdAndDelete(categoryId);
  if (!response) {
    return res
      .status(404)
      .json({ status: "failed", message: "not foundSubCategory " });
  }

  res.status(200).json({ message: "delete subCategory successfully" });
});
