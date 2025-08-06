const mongoose = require("mongoose");

const subCatgorySchema = new mongoose.Schema(
  {
    title: {
      required: [true, "SubCategory title is required"],
      type: String,
      trim: true,
      unique: [true, "SubCategory title is should be unique"],
      minLength: [3, "too short subCategory title"],
      maxLength: [20, "too large subCategory title"],
    },
    type: {
      required: [true, "SubCategory type is required"],
      type: String,
      trim: true,
      unique: [true, "SubCategory type is should be unique"],
      minLength: [3, "too short subCategory type"],
      maxLength: [20, "too large subCategory type"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "category is required"],
    },
  },
  {
    timestamps: true,
  }
);

const subCategoryModel = mongoose.model("subCategory", subCatgorySchema);
module.exports = subCategoryModel;
