const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "category Title unique"],
      required: [true, "category name is required"],
      minLength: [3, "category min Length is 3"],
      maxLength: [50, "category max length is 50"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
