const express = require("express");

const { signUp, logIn } = require("../services/authService");

const { signUpValidator } = require("../utils/Validator/authValidator");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);
router.route("/login").post(logIn);
module.exports = router;
