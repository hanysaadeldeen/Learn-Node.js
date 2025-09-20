const express = require("express");

const {
  signUp,
  logIn,
  forgetPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../services/authService");

const {
  signUpValidator,
  logInValidator,
  verifyPasswordValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
} = require("../utils/Validator/authValidator");

const router = express.Router();

router.post("/signup", signUpValidator, signUp);
router.post("/login", logInValidator, logIn);
router.post("/forgetPassword", forgetPasswordValidator, forgetPassword);
router.post("/verifyResetCode", verifyPasswordValidator, verifyPassResetCode);
router.post("/resetPassword", resetPasswordValidator, resetPassword);
module.exports = router;
