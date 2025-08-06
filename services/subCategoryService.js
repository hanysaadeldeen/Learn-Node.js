const asyncHandler = require("express-async-handler");

const subCategoryModel = require("../models/subCategoryModel");

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { title, type } = req.body;

  const subCategory = await subCategoryModel.create({
    title,
    type,
    category: categoryId,
  });

  res.status(201).json({
    status: "success",
    data: subCategory,
  });
});
exports.getSubCategories = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const subCategories = await subCategoryModel.find({ category: categoryId });
  res
    .status(200)
    .json({ length: subCategories.length, subCategory: subCategories });
});
