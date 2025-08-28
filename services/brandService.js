const asyncHandler = require("express-async-handler");
const BrandSchema = require("../models/brandModel");
const ApiFeature = require("../utils/apiFeature");

const {
  DeleteDoc,
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
  GetDocs,
} = require("./handlersFactory");

// @create  Brand
// @route  post /api/brands
// @access private
exports.CreateBrand = CreateDoc(BrandSchema);

// @get  Brand
// @route  get /api/brands
// @access public

exports.getAllBrands = GetDocs(BrandSchema);

exports.getSpecificBrand = GetSpecificDoc(BrandSchema);

// @desc    Update specific brand
// @route   PUT /api/v1/brand/:id
// @access  Private

exports.updateBrand = UpdateDoc(BrandSchema);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brand/:id
// @access  Private
exports.deleteBrand = DeleteDoc(BrandSchema);
