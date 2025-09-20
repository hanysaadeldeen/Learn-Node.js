const express = require("express");

const {
  CreateUsers,
  getAllUserss,
  getSpecificUsers,
  updateUser,
  unActiveUsers,
  UploadUserImage,
  updateUserPassword,
  getLoggedUserData,
  getUser,
  updateLogedUserPassword,
  updateLogedUser,
  deleteLoggedUserData,
} = require("../services/userService");

const { ProcessImgGlobal } = require("../services/handlersFactory");

const { multerErrorHandler } = require("../middlewares/multerMiddleWare");

const {
  createUserValidator,
  updateAndUnActiveUserValidator,
  updateUserPasswordValidator,
  updateMYPasswordValidator,
  updateMyProfValidator,
} = require("../utils/Validator/userValidator");

const router = express.Router();

const { protect, allowedTo } = require("../services/authService");

//! for Users
router.use(protect);

router.get("/getMe", getLoggedUserData, getUser);
router.put(
  "/updateMyPassword",
  updateMYPasswordValidator,
  updateLogedUserPassword
);
router.put("/updateMe", updateMyProfValidator, updateLogedUser);
router.delete("/deleteMe", deleteLoggedUserData);

//! for Admin

router.use(allowedTo(["admin", "manager"]));

router.put(
  "/updatePassword/:id",
  updateUserPasswordValidator,
  updateUserPassword
);
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
