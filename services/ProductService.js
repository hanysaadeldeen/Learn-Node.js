const ProductModel = require("../models/ProductModel");
const asynchandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const slugify = require("slugify");

const ApiFeature = require("../utils/apiFeature");
exports.createProduct = asynchandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const productResponse = await ProductModel.create(req.body);

  res.status(201).json({
    success: "success",
    product: productResponse,
  });
});

exports.getAllProducts = asynchandler(async (req, res) => {
  const apiFeature = new ApiFeature(ProductModel.find(), req.query)
    .search()
    .filter()
    .sort()
    .fields()
    .paginate();
  const productResponse = await apiFeature.query.populate({
    path: "category",
    select: "name slug-_id",
  });

  // response
  res.status(200).json({
    status: "success",
    length: productResponse.length,
    data: productResponse,
    page: apiFeature.page,
    limit: apiFeature.limit,
  });
});

exports.getProduct = asynchandler(async (req, res, next) => {
  const productResponse = await ProductModel.findById(req.params.productId);
  if (!productResponse) {
    return next(
      new AppError(
        `no product found white this id ${req.params.productId}`,
        404
      )
    );
  }
  res.status(200).json({
    status: "success",
    data: productResponse,
  });
});

exports.updateProduct = asynchandler(async (req, res) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const brandResponse = await ProductModel.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: brandResponse,
  });
});

exports.deleteProduct = asynchandler(async (req, res, next) => {
  const productResponse = await ProductModel.findByIdAndDelete(
    req.params.productId
  );
  if (!productResponse) {
    return next(
      new AppError(
        `no product found white this id ${req.params.productId}`,
        404
      )
    );
  }
  res.status(200).json({
    status: "success",
    message: "prduct deleted successfully",
  });
});
