const BrandSchema = require("../models/brandModel");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const {
  DeleteDoc,
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
  GetDocs,
} = require("./handlersFactory");
const { fileFilterImages } = require("../middlewares/multerMiddleWare");

// upload BrandImg diskStorage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/brands");
//   },
//   filename: function (req, file, cb) {
//     const extention = file.mimetype.split("/")[1];
//     const fileName = `brand-${uuidv4()}-${Date.now()}-.${extention}`;
//     cb(null, fileName);
//   },
// });

exports.ProcessBrandImg = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `brand-${uuidv4()}-${Date.now()}-.webP`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("webp")
    .webp({ quality: 70 })
    .toFile(path.join("uploads/brands", filename));
  next();
});

// upload BrandImg memoryStorage
const storage = multer.memoryStorage();

const upload = multer({ storage });

// const upload = multer({ storage, fileFilter: fileFilterImages });
exports.UploadBrandImg = upload.single("image");
// @create  Brand
// @route  post /api/brands
// @access private
exports.CreateBrand = CreateDoc(BrandSchema);

// @get  Brand
// @route  get /api/brands
// @access public

exports.getAllBrands = GetDocs(BrandSchema);

exports.getSpecificBrand = GetSpecificDoc(BrandSchema);

// @desc    Update specific brand
// @route   PUT /api/v1/brand/:id
// @access  Private

exports.updateBrand = UpdateDoc(BrandSchema);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brand/:id
// @access  Private
exports.deleteBrand = DeleteDoc(BrandSchema);
