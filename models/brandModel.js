const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Brand title is Required"],
      minlenght: [3, "Brand title must be at least 3 characters"],
      maxlenght: [20, "Brand title must not be more than 20 characters"],
      trim: true,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const BrandSchema = mongoose.model("Brand", brandSchema);

module.exports = BrandSchema;
