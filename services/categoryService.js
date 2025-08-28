const CategoryModel = require("../models/categoryModel");
const {
  DeleteDoc,
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
  GetDocs,
} = require("./handlersFactory");

// @create category
// @route  post /api/categories
// @access private
exports.createCategory = CreateDoc(CategoryModel);

// @get category
// @route  get /api/categories
// @access public

exports.getCategories = GetDocs(CategoryModel, "name");
//@get category by id
//@route get /api/categories/:id
//@access public

exports.getSpecificCategory = GetSpecificDoc(CategoryModel);

//@update category by id
//@route put /api/categories/:id
//@access Private

exports.updateCategory = UpdateDoc(CategoryModel);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = DeleteDoc(CategoryModel);
