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
      required: [true, "Proejcts Title Required"],
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
      required: false,
    },
    author: {
      type: String,
      required: [true, "author Required"],
    },
  },
  { timestamps: true }
);

// create model after schema
// const ProductsModel = mongoose.model("projects", ProductsSchema);
const ProductsModel = mongoose.model("projects", ProductsSchema);

module.exports = ProductsModel;
