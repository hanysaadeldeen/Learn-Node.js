const ProductModel = require("../models/ProductModel");
const asynchandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const slugify = require("slugify");

const ApiFeature = require("../utils/apiFeature");
const { DeleteDoc, UpdateDoc, GetSpecificDoc } = require("./handlersFactory");
// const ApiDelete = require("../utils/apiDelete");
exports.createProduct = asynchandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const productResponse = await ProductModel.create(req.body);

  res.status(201).json({
    success: "success",
    product: productResponse,
  });
});

exports.getAllProducts = asynchandler(async (req, res) => {
  const countDoc = await ProductModel.countDocuments();

  const apiFeature = new ApiFeature(ProductModel.find(), req.query)
    .paginate(countDoc)
    .filter()
    .sort()
    .fields()
    .search();

  const { query, paginationResult } = apiFeature;

  const productResponse = await query.populate({
    path: "category",
    select: "name slug-_id",
  });

  // response
  res.status(200).json({
    status: "success",
    length: productResponse.length,
    paginationResult,
    data: productResponse,
  });
});

exports.getProduct = GetSpecificDoc(ProductModel);

exports.updateProduct = UpdateDoc(ProductModel);

exports.deleteProduct = DeleteDoc(ProductModel);
