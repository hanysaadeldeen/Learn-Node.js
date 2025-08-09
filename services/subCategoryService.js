const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const subCategoryModel = require("../models/subCategoryModel");



exports.setCategoryIdtoBody = (req, res, next) => {
 if(req.params.categoryId) req.body.category=req.params.categoryId
  next()
}

exports.createSubCategory = asyncHandler(async (req, res) => {

 if(req.params.categoryId) req.body.category=req.params.categoryId

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
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;



  let filterForCategory={}
  if (req.params.categoryId) filterForCategory={category:req.params.categoryId}
 
    const  subCategories= await subCategoryModel
    .find(filterForCategory)
    .skip(skip)
    .limit(limit)
  

  
  res.status(200).json({
    length: subCategories.length,
    subCategory: subCategories,
    page,
    limit,
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
