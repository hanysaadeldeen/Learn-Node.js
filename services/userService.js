const { uploadSingle } = require("../middlewares/multerMiddleWare");
const UserSchema = require("../models/userModel");

const {
  DeleteDoc,
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

// @desc    Delete specific Users
// @route   DELETE /api/v1/Users/:id
// @access  Private
exports.deleteUsers = DeleteDoc(UserSchema);
