const asyncHandler = require("express-async-handler");
const BrandSchema = require("../models/brandModel");
const slugify = require("slugify");

exports.CreateBrand = asyncHandler(async (req, res) => {
  const { title, image } = req.body;
  const brandResponse = await BrandSchema.create({
    title,
    slug: slugify(title),
  });
  res.status(201).json({ data: brandResponse });
});

exports.getAllBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;

  const skip = (page - 1) * limit;
  const brandResponse = await BrandSchema.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: "success",
    length: brandResponse.length,
    data: brandResponse,
  });
});
exports.getSpecificBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const brandResponse = await BrandSchema.findById(brandId);
  res.status(200).json({ status: "success", data: brandResponse });
});

exports.updateBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const { title, image } = req.body;
  const brandResponse = await BrandSchema.findByIdAndUpdate(
    brandId,
    {
      title,
      slug: slugify(title),
    },
    { new: true }
  );
  res.status(200).json({ status: "success", data: brandResponse });
});

exports.deleteBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const brandResponse = await BrandSchema.findByIdAndDelete(brandId);
  res.status(200).json({ status: "success", data: brandResponse });
});
