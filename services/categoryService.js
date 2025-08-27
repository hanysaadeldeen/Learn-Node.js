const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const mongoose = require("mongoose");
const CategoryModel = require("../models/categoryModel");
const ApiFeature = require("../utils/apiFeature");
const { DeleteDoc, UpdateDoc, GetSpecificDoc } = require("./handlersFactory");
// @create category
// @route  post /api/categories
// @access private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

//get category
// @route  get /api/categories
// @access publick

exports.getCategories = asyncHandler(async (req, res) => {
  const countDoc = await CategoryModel.countDocuments();
  const apiFeature = new ApiFeature(CategoryModel.find(), req.query)
    .search("name")
    .sort()
    .paginate(countDoc);

  const { query, paginationResult } = apiFeature;

  const categories = await query;
  res
    .status(200)
    .json({ length: categories.length, paginationResult, data: categories });
});

//@get category by id
//@route get /api/categories/:id
//@access public

exports.getSpecificCategory = GetSpecificDoc(CategoryModel);

//@update category by id
//@route get /api/categories/:id
//@access Private

exports.updateCategory = UpdateDoc(CategoryModel);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = DeleteDoc(CategoryModel);
