const express = require("express");

const {
  CreateUsers,
  getAllUserss,
  getSpecificUsers,
  updateUser,
  unActiveUsers,
  UploadUserImage,
  updateUserPassword,
} = require("../services/userService");

const { ProcessImgGlobal } = require("../services/handlersFactory");

const { multerErrorHandler } = require("../middlewares/multerMiddleWare");

const {
  createUserValidator,
  updateAndUnActiveUserValidator,
} = require("../utils/Validator/userValidator");

const router = express.Router();

router.put("/updatePassword/:id", updateUserPassword);

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
    updateUser
  )
  .delete(updateAndUnActiveUserValidator, unActiveUsers);
module.exports = router;
