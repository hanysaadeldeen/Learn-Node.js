const express = require("express");
const { getProjects } = require("../services/projectsService");
const router = express.Router();

router.get("/", getProjects);

module.exports = router;
