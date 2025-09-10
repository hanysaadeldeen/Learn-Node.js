const express = require("express");

const {
  CreateUsers,
  getAllUserss,
  getSpecificUsers,
  updateUsers,
  unActiveUsers,
  UploadUserImage,
} = require("../services/userService");

const { ProcessImgGlobal } = require("../services/handlersFactory");

const { multerErrorHandler } = require("../middlewares/multerMiddleWare");

const {
  createUserValidator,
  updateAndUnActiveUserValidator,
} = require("../utils/Validator/userValidator");

const router = express.Router();

router
  .route("/")
  .post(
    UploadUserImage,
    ProcessImgGlobal("users"),
    createUserValidator,
    CreateUsers,
    multerErrorHandler
  )
  .get(getAllUserss);
router
  .route("/:id")
  .get(updateAndUnActiveUserValidator, getSpecificUsers)
  .put(
    UploadUserImage,
    ProcessImgGlobal("users"),
    updateAndUnActiveUserValidator,
    updateUsers
  )
  .delete(updateAndUnActiveUserValidator, unActiveUsers);
module.exports = router;
