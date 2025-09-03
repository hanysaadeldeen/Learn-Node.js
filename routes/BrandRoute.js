const express = require("express");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/brands" });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/brands");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

const {
  CreateBrand,
  getAllBrands,
  getSpecificBrand,
  updateBrand,
  deleteBrand,
  UploadBrandImg,
  ProcessBrandImg,
} = require("../services/brandService");

const {
  createBrandValidator,
  getSpecificBrandValidator,
  updateSpecificBrandValidator,
  deleteSpecificBrandValidator,
} = require("../utils/Validator/brandValidator");
const { multerErrorHandler } = require("../middlewares/multerMiddleWare");

const router = express.Router();

router
  .route("/")
  .post(
    UploadBrandImg,
    ProcessBrandImg,
    createBrandValidator,
    CreateBrand,
    multerErrorHandler
  )
  .get(getAllBrands);
router
  .route("/:id")
  .get(getSpecificBrandValidator, getSpecificBrand)
  .put(updateSpecificBrandValidator, updateBrand)
  .delete(deleteSpecificBrandValidator, deleteBrand);
module.exports = router;
