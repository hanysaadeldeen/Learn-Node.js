const ProductModel = require("../models/ProductModel");
const asynchandler = require("express-async-handler");

exports.createProduct = asynchandler(async (req, res) => {
  const {
    title,
    priceBefore,
    priceAfter,
    description,
    image,
    colors,
    quantity,
    category,
    brand,
  } = req.body;
  const productResponse = await ProductModel.create({
    title,
    priceBefore,
    priceAfter,
    description,
    image,
    colors,
    quantity,
    category,
    brand,
  });

  res.status(200).json({
    success: "success",
    product: productResponse,
  });
});

exports.getAllProducts = asynchandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;

  const skip = (page - 1) * limit;
  const brandResponse = await ProductModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: "success",
    length: brandResponse.length,
    data: brandResponse,
  });
});
