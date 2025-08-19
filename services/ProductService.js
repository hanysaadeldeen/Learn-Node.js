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
  // ! Filtering
  // const queryObj = { ...req.query };
  // const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
  // excludedFields.forEach((el) => delete queryObj[el]);

  // ! Pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 20;
  // const skip = (page - 1) * limit;

  // ! applying filter using gte, gt, lte, lt
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // const filter = JSON.parse(queryStr);

  const mongooseQuery = new ApiFeature(ProductModel.find(), req.query)
    .search()
    .filter()
    .buildQuery()
    .sort()
    .fields();

  const productResponse = await mongooseQuery.query;
  // .populate({ path: "category", select: "name" });
  // .filter();

  //
  // .sort()
  //
  // .fields()
  // .paginate()
  // ;

  // .skip(skip)
  // .limit(limit)

  // !  field selection
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   mongooseQuery.select(fields);
  // } else {
  //   mongooseQuery.select("-__v");
  // }

  // ! Search functionality
  // let searchQuery = {};
  // if (req.query.keyword) {
  //   const keyword = req.query.keyword;
  //   searchQuery = {
  //     $or: [
  //       { title: { $regex: keyword, $options: "i" } },
  //       { description: { $regex: keyword, $options: "i" } },
  //     ],
  //   };
  //   mongooseQuery.find(searchQuery);
  // }

  // response
  res.status(200).json({
    status: "success",
    length: productResponse.length,
    data: productResponse,
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
