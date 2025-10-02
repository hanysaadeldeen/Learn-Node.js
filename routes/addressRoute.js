const express = require("express");

const {
  addUserAddress,
  deleteAddressUser,
  getLoggedUserAddresses,
} = require("../services/addressService");

const router = express.Router();

const { protect, allowedTo } = require("../services/authService");

router.use(protect, allowedTo(["user"]));

router.route("/").post(addUserAddress).get(getLoggedUserAddresses);
router.delete("/:addressId", deleteAddressUser);

module.exports = router;
