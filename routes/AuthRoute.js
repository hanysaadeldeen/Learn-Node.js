const express = require("express");

const { signUp, logIn, protect } = require("../services/authService");

const {
  signUpValidator,
  logInValidator,
} = require("../utils/Validator/authValidator");

const router = express.Router();

router.route("/signup").post(signUpValidator, signUp);
router.route("/login").post(logInValidator, protect, logIn);
module.exports = router;
