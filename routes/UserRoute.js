const express = require("express");

const {
  CreateUsers,
  getAllUserss,
  getSpecificUsers,
  updateUsers,
  deleteUsers,
  UploadUserImage,
} = require("../services/userService");

// const {
//   createBrandValidator,
//   getSpecificBrandValidator,
//   updateSpecificBrandValidator,
//   deleteSpecificBrandValidator,
// } = require("../utils/Validator/brandValidator");
const { multerErrorHandler } = require("../middlewares/multerMiddleWare");
const { ProcessImgGlobal } = require("../services/handlersFactory");

const router = express.Router();

router
  .route("/")
  .post(
    UploadUserImage,
    ProcessImgGlobal("users"),
    CreateUsers,
    multerErrorHandler
  )
  .get(getAllUserss);
router
  .route("/:id")
  .get(getSpecificUsers)
  .put(UploadUserImage, ProcessImgGlobal("users"), updateUsers)
  .delete(deleteUsers);
module.exports = router;
