const asyncHandler = require("express-async-handler");
const BrandSchema = require("../models/brandModel");
const slugify = require("slugify");
const AppError = require("../utils/AppError");

const ApiFeature = require("../utils/apiFeature");
const { DeleteDoc, UpdateDoc } = require("./handlersFactory");

exports.CreateBrand = asyncHandler(async (req, res) => {
  const { title, image } = req.body;
  const brandResponse = await BrandSchema.create({
    title,
    slug: slugify(title),
  });
  res.status(201).json({ data: brandResponse });
});

exports.getAllBrands = asyncHandler(async (req, res) => {
  const countDoc = await BrandSchema.countDocuments();
  const apifeature = new ApiFeature(BrandSchema.find(), req.query)
    .search()
    .sort()
    .paginate(countDoc);

  const { query, paginationResult } = apifeature;
  const brandResponse = await query;

  res.status(200).json({
    status: "success",
    length: brandResponse.length,
    paginationResult,
    data: brandResponse,
  });
});
exports.getSpecificBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brandResponse = await BrandSchema.findById(id);
  if (!brandResponse) {
    return next(new AppError("No brand found with this ID", 404));
  }
  res.status(200).json({ status: "success", data: brandResponse });
});

// @desc    Update specific brand
// @route   PUT /api/v1/brand/:id
// @access  Private

exports.updateBrand = UpdateDoc(BrandSchema);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brand/:id
// @access  Private
exports.deleteBrand = DeleteDoc(BrandSchema);
