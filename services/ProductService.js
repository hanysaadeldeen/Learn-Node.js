const { uploadImagesArray } = require("../middlewares/multerMiddleWare");
const ProductModel = require("../models/ProductModel");
const {
  DeleteDoc,
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
  GetDocs,
} = require("./handlersFactory");

// @create  product
// @route  post /api/product
// @access private
exports.createProduct = CreateDoc(ProductModel);

// @get  product
// @route  get /api/product
// @access public
exports.getAllProducts = GetDocs(ProductModel);

// @get  Specific Product
// @route  get /api/product/:id
// @access public
exports.getProduct = GetSpecificDoc(ProductModel, {
  populate: { path: "ProductReview" },
});

//@update product by id
//@route put /api/product/:id
//@access Private
exports.updateProduct = UpdateDoc(ProductModel);

// @desc    Delete specific Product
// @route   DELETE /api/v1/Product/:id
// @access  Private
exports.deleteProduct = DeleteDoc(ProductModel);
