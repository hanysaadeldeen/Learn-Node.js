

const express = require("express");

const {createProduct}=require("../services/projectsService")

const router = express.Router({mergeParams:true});


router.route("/").post(createProduct)

exports.modules=router