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

  const user = await UserSchema.findOne({ email });

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
  // let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // } else {
  //   console.log(req.headers.authorization);
  // }

  // if (!token) {
  //   return new AppError(
  //     "You are not logged in! Please log in to get access.",
  //     401
  //   );
  // }

  // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // // const currentUser = await UserSchema.findById(decoded.userId);
  // // console.log(currentUser);

  // next();

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

  console.log(decoded); // { userId: '...', userName: '...', iat: ..., exp: ... }

  next();
});
