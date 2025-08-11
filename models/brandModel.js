const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Brand Title is should be unique"],
      required: [true, "Brand name is Required"],
      minlenght: [3, "Brand name must be at least 3 characters"],
      maxlenght: [20, "Brand name must not be more than 20 characters"],
      trim: true,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "Brand image is Required"],
    },
  },
  {
    timestamps: true,
  }
);

const BrandSchema = mongoose.model("Brand", brandSchema);

module.exports = BrandSchema;
