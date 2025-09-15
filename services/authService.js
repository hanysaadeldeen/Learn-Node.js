const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const UserSchema = require("../models/userModel");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
exports.signUp = asyncHandler(async (req, res, next) => {
  const { name, slug, email, password, profilePhoto } = req.body;

  const user = await UserSchema.create({
    name,
    slug,
    email,
    password,
    profilePhoto,
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({ status: "success", data: user, token });
});
exports.logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserSchema.find({ email });

  if (!user) {
    return new AppError("login failed invalid email or password", 401);
  }

  res.status(201).json({ status: "success", data: user });
});
