const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/userModel");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/sendEmail");

exports.signUp = asyncHandler(async (req, res, next) => {
  const { name, slug, email, password, profilePhoto } = req.body;

  const user = await UserSchema.create({
    name,
    slug,
    email,
    password,
    profilePhoto,
    passwordChangedAt: Date.now(),
  });

  const token = jwt.sign(
    { userId: user.id, userName: name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.status(201).json({ status: "success", data: user, token });
});

exports.logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({
    email,
  });

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return next(new AppError("Invalid email or password", 401));
  }
  const token = jwt.sign(
    { userId: user.id, userName: user.name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  user.password = undefined;
  user.active = undefined;
  user.role = undefined;

  res.status(201).json({ status: "success", data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }

  // 2) verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 2) verify if user still exists
  const currentUser = await UserSchema.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new AppError(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }

  // check if user Change Password After login

  if (currentUser.passwordChangedAt) {
    const userPasswordDate = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (userPasswordDate > decoded.iat) {
      return next(new AppError("user Change Password Please login ", 401));
    }
  }

  req.user = currentUser;
  next();
});

exports.allowedTo = (allowedTo) =>
  asyncHandler(async (req, res, next) => {
    if (!allowedTo.includes(req.user.role)) {
      return next(new AppError("you are not allowed to make this action", 403));
    }
    next();
  });

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const checkUserExists = await UserSchema.findOne({ email });
  if (!checkUserExists) {
    return next(new AppError(`this Email:${email} didn't exits`, 404));
  }
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const sha256Hash = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  checkUserExists.resetCode = sha256Hash;

  checkUserExists.resetCodeExpires = Date.now() + 10 * 60 * 1000;
  checkUserExists.passwordResetVerified = false;
  await checkUserExists.save();

  const message = `Hi ${checkUserExists.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;

  try {
    await sendEmail({
      email: checkUserExists.email,
      subject: "Your password reset code (valid for 10 min)",
      message,
    });
  } catch (err) {
    checkUserExists.resetCode = undefined;
    checkUserExists.resetCodeExpires = undefined;
    checkUserExists.passwordResetVerified = undefined;
    await checkUserExists.save();
    return next(new AppError("There is an error in sending email", 500));
  }

  res
    .status(200)
    .json({ status: "Success", message: "Reset code sent to email" });
});

exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  const code = req.body.code;

  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

  const checkUserExists = await UserSchema.findOne({
    resetCode: hashedCode,
    resetCodeExpires: { $gt: Date.now() },
  });

  if (!checkUserExists) {
    return next(new AppError("Invalid or expired reset code", 400));
  }
  checkUserExists.passwordResetVerified = true;
  await checkUserExists.save();
  const token = jwt.sign(
    { userId: checkUserExists.id, email: checkUserExists.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "10m",
    }
  );
  res.status(200).json({ message: "Code verified successfully", token });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("please verify your email first", 400));
  }

  // 2) verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await UserSchema.findById(decoded.userId);
  if (!user || !user.passwordResetVerified) {
    return next(new AppError("Please verify reset code first", 400));
  }

  user.password = password;
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  user.passwordResetVerified = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();
  const newToken = jwt.sign(
    { userId: user.id, userName: user.name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.status(200).json({
    message: "user password updated successfully",
    token: newToken,
  });
});
