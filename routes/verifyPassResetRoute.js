const express = require("express");

const { verifyPassResetCode } = require("../services/authService");

const { verifyPasswordValidator } = require("../utils/Validator/authValidator");

const router = express.Router();

router.route("/").post(verifyPasswordValidator, verifyPassResetCode);
module.exports = router;
