// create scheme
const mongoose = require("mongoose");

// const ProductsSchema = new mongoose.Schema({
//   title: String,
//   author: String,
// });
const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Proejcts Title Required"],
      unique: [true, "Proejcts Title unique"],
      minLength: [3, "too short title"],
      maxLength: [20, "too large title"],
    },
    //A and B ==> any category will be with dath and lowerCase (like a-and-b)
    slug: {
      type: String,
      lowercase: true,
    },
    images: {
      type: String,
      require: false,
    },
    author: {
      type: String,
      require: [true, "author Required"],
    },
  },
  { timestamps: true }
);

// create model after schema
const ProductsModel = mongoose.model("projects", ProductsSchema);

module.exports = ProductsModel;
