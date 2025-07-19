const express = require("express");
const { getProjects, createProjects } = require("../services/projectsService");
const router = express.Router();

// router.get("/", getProjects);
// router.post("/", createProjects);
router.route("/").get(getProjects).post(createProjects);

module.exports = router;
