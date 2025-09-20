const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { uploadSingle } = require("../middlewares/multerMiddleWare");
const UserSchema = require("../models/userModel");

const {
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
  GetDocs,
} = require("./handlersFactory");
const AppError = require("../utils/AppError");

// for upload  Single Image
exports.UploadUserImage = uploadSingle("profilePhoto");

exports.getUser = GetSpecificDoc(UserSchema);

// !private for Admin
// @create  Users
// @route  post /api/users
// @access private
exports.CreateUsers = CreateDoc(UserSchema);

// !private for Admin
// @get  Users
// @route  get /api/user
// @access private
exports.getAllUserss = GetDocs(UserSchema);

// !private for Admin
// @get  Users
// @route  get /api/users/userID
// @access private
exports.getSpecificUsers = GetSpecificDoc(UserSchema);

// !private for Admin
// @desc    Update specific Users
// @route   PUT /api/v1/Users/userId
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  const response = await UserSchema.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profilePhoto: req.body.profilePhoto,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!response) {
    return next(res.status(404).json({ message: "Document not found" }));
  }
  res.status(200).json({ status: "success", data: response });
});

// !private for Admin
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const response = await UserSchema.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 5),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!response) {
    return next(res.status(404).json({ message: "Document not found" }));
  }
  res.status(200).json({ status: "success", data: response });
});

// !private for Admin
// @desc    unActive specific Users
// @route   update /api/v1/Users/:id
// @access  Private
const deactivateUser = async (id) => {
  const response = await UserSchema.findByIdAndUpdate(
    id,
    {
      active: false,
    },
    {
      new: true,
    }
  );
  if (!response) {
    return next(new AppError("Document not found", 404));
  }
  res.status(200).json({ status: "success", data: response });
};

exports.unActiveUsers = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const response = await deactivateUser(id);

  if (!response) {
    return next(new AppError("Document not found", 404));
  }
  res.status(200).json({ status: "success", data: response });
});

//! for user

exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

//! update Password for user
exports.updateLogedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await UserSchema.findById(req.user._id);
  if (!user) {
    return next(new AppError(`there is no user for this id = ${id}`, 404));
  }
  const isCorrectPassword = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  if (!isCorrectPassword) {
    return next(new AppError("current password is wrong", 404));
  }

  const response = await UserSchema.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 5),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!response) {
    return next(res.status(404).json({ message: "Document not found" }));
  }
  const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({ status: "success", token });
});

exports.updateLogedUser = asyncHandler(async (req, res, next) => {
  const { name, phone } = req.body;
  const slug = slugify(name, { lower: true });
  const user = await UserSchema.findByIdAndUpdate(
    req.user._id,
    {
      name,
      slug,
      phone,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new AppError("updated Falid try again later", 404));
  }
  res.status(201).json({ message: "updated Successfully", data: user });
});

exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  const response = await deactivateUser(req.user._id);
  if (!response) {
    return next(new AppError("Document not found", 404));
  }
  res.status(200).json({ status: "success", data: response });
});
