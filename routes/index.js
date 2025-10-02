const express = require("express");
const router = express.Router();

// import routes
const categoryRoute = require("./CagetoryRoute");
const SubCategoryRoute = require("./SubCategoryRoute");
const ProductRoute = require("./ProductRoute");
const BrandRoute = require("./BrandRoute");
const UserRoute = require("./UserRoute");
const AuthRoute = require("./AuthRoute");
const ReviewRoute = require("./ReviewRoute");
const wishLishRoute = require("./wishLishRoute");
const addressRoute = require("./addressRoute");

// mount routes
router.use("/categories", categoryRoute);
router.use("/subcategories", SubCategoryRoute);
router.use("/brands", BrandRoute);
router.use("/products", ProductRoute);
router.use("/users", UserRoute);
router.use("/auth", AuthRoute);
router.use("/review", ReviewRoute);
router.use("/wishlish", wishLishRoute);
router.use("/address", addressRoute);

module.exports = router;
