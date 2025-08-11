const express = require("express");
const { CreateBrand } = require("../services/brandService");

const { createBrandValidator } = require("../utils/Validator/brandValidator");

const router = express.Router();

router.route("/").post(createBrandValidator, CreateBrand);
module.exports = router;
