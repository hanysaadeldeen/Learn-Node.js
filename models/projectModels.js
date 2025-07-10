// create scheme
const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  title: String,
  author: String,
});

// create model after schema
const productsModel = mongoose.model("projects", ProductsSchema);

module.exports = productsModel;
