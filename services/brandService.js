const BrandSchema = require("../models/brandModel");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const {
  DeleteDoc,
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
  GetDocs,
} = require("./handlersFactory");

// upload BrandImg
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/brands");
  },
  filename: function (req, file, cb) {
    "fileName-{uuid}-Date.now()-extention";
    const extention = file.mimetype.split("/")[1];
    const fileName = `brand-${uuidv4()}-${Date.now()}-.${extention}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

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
