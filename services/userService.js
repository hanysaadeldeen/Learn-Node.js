const asyncHandler = require("express-async-handler");

const { uploadSingle } = require("../middlewares/multerMiddleWare");
const UserSchema = require("../models/userModel");

const {
  UpdateDoc,
  GetSpecificDoc,
  CreateDoc,
  GetDocs,
} = require("./handlersFactory");

// for upload  Single Image
exports.UploadUserImage = uploadSingle("profilePhoto");

// @create  Users
// @route  post /api/users
// @access private
exports.CreateUsers = CreateDoc(UserSchema);

// @get  Users
// @route  get /api/user
// @access private

exports.getAllUserss = GetDocs(UserSchema);

// @get  Users
// @route  get /api/users/userID
// @access private

exports.getSpecificUsers = GetSpecificDoc(UserSchema);

// @desc    Update specific Users
// @route   PUT /api/v1/Users/userId
// @access  Private

exports.updateUsers = UpdateDoc(UserSchema);

// @desc    unActive specific Users
// @route   update /api/v1/Users/:id
// @access  Private
exports.unActiveUsers = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
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
    return next(res.status(404).json({ message: "Document not found" }));
  }
  res.status(200).json({ status: "success", data: response });
});
