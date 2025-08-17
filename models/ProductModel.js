const { required } = require("joi");
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minLength: [3, "Product title must be at least 3 characters"],
      maxLength: [100, "Product title must be at most 30 characters"],
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
    },
    priceBefore: {
      type: Number,
      required: [true, "Price before discount is required"],
      min: [1, "Price must be greater than 0"],
    },
    priceAfter: {
      type: Number,
      required: [true, "Price after discount is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minLength: [3, "Description must be at least 3 characters"],
      maxLength: [300, "Description must be at most 300 characters"],
    },
    imgCover: {
      type: String,
      required: [false, "image Cover is required"],
    },
    images: {
      type: [String],
      default: ["default-image.jpg"],
    },
    colors: {
      type: [String],
      required: false,
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      minle: [0, "Rating must be above 0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
