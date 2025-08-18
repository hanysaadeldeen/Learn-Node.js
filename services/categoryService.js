const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const mongoose = require("mongoose");
const CategoryModel = require("../models/categoryModel");
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
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;

  const skip = (page - 1) * limit;

  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ length: categories.length, data: categories });
});

//@get category by id
//@route get /api/categories/:id
//@access public

exports.getSpecificCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid category idTTT" });
  }

  const category = await CategoryModel.findById(id);

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ data: category });
});

//@update category by id
//@route get /api/categories/:id
//@access public

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const oldcategory = await CategoryModel.findById(id);
  // if (!oldcategory) {
  //   res.status(404).json({ msg: `"There is no category With This ID"${id}` });
  // }
  const category = await CategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
    },
    { new: true }
  );

  res.status(201).json({ oldName: oldcategory.name, data: category });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // test
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(209).json({ message: "category deleted" });
});
