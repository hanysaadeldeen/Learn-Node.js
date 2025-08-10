const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
    trim: true,
    minLength: [3, "Product title must be at least 3 characters"],
    maxLength: [30, "Product title must be at most 30 characters"],
  },
  priceBefore: {
    type: Number,
    required: [true, "Price before discount is required"],
    min: [1, "Price must be greater than 0"],
  },
  priceAfter: {
    type: Number,
    required: [true, "Price after discount is required"],
    min: [1, "Price must be greater than 0"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minLength: [3, "Description must be at least 3 characters"],
    maxLength: [300, "Description must be at most 300 characters"],
  },
  images: {
    type: [String],
    default: ["default-image.jpg"], 
  },
  colors: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  ratingAverage: {
    type: Number,
    default: 0,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: [true, "Brand is required"],
  },
}, {
  timestamps: true,
});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
