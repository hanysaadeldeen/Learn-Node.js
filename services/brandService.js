const asyncHandler = require("express-async-handler");
const BrandSchema = require("../models/brandModel");
const { slugify } = require("slugify");

exports.CreateBrand = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const brandResponse = await BrandSchema.create({
    name,
    image,
    slug: slugify(name),
  });

  res.status(201).json({ data: brandResponse });
});
