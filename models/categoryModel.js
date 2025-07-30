const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Proejcts Title unique"],
      require: [true, "category name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
