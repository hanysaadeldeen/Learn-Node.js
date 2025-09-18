const express = require("express");

const { forgetPassword } = require("../services/authService");

const { forgetPasswordValidator } = require("../utils/Validator/authValidator");

const router = express.Router();

router.route("/").post(forgetPasswordValidator, forgetPassword);
module.exports = router;
