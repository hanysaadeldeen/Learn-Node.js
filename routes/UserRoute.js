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
  updateUserPasswordValidator,
} = require("../utils/Validator/userValidator");

const router = express.Router();

router.put(
  "/updatePassword/:id",
  updateUserPasswordValidator,
  updateUserPassword
);
const { protect, allowedTo } = require("../services/authService");

router
  .route("/")
  .post(
    protect,
    allowedTo(["admin", "manager"]),
    UploadUserImage,
    ProcessImgGlobal("users"),
    createUserValidator,
    CreateUsers,
    multerErrorHandler
  )
  .get(protect, allowedTo(["admin", "manager"]), getAllUserss);
router
  .route("/:id")
  .get(
    protect,
    allowedTo(["admin", "manager"]),
    updateAndUnActiveUserValidator,
    getSpecificUsers
  )
  .put(
    protect,
    allowedTo(["admin", "manager"]),
    UploadUserImage,
    ProcessImgGlobal("users"),
    updateAndUnActiveUserValidator,
    updateUser
  )
  .delete(
    protect,
    allowedTo(["admin", "manager"]),
    updateAndUnActiveUserValidator,
    unActiveUsers
  );
module.exports = router;
