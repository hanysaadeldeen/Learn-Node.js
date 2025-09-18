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

    console.log(userPasswordDate, decoded.iat);

    if (userPasswordDate > decoded.iat) {
      return next(new AppError("user Change Password Please login ", 401));
    }
  }

  req.user = currentUser;
  next();
});
