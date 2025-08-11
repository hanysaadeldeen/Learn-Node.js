const express = require("express");
const {
  CreateBrand,
  getAllBrands,
  getSpecificBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");

const {
  createBrandValidator,
  getSpecificBrandValidator,
  updateSpecificBrandValidator,
  deleteSpecificBrandValidator,
} = require("../utils/Validator/brandValidator");

const router = express.Router();

router.route("/").post(createBrandValidator, CreateBrand).get(getAllBrands);
router
  .route("/:brandId")
  .get(getSpecificBrandValidator, getSpecificBrand)
  .put(updateSpecificBrandValidator, updateBrand)
  .delete(deleteSpecificBrandValidator, deleteBrand);
module.exports = router;
