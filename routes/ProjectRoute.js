const express = require("express");
const {
  getProjects,
  createProjects,
  getSpecificProject,
} = require("../services/projectsService");
const router = express.Router();

// router.get("/", getProjects);
// router.post("/", createProjects);
router.route("/").get(getProjects).post(createProjects);
router.route("/:id").get(getSpecificProject);
module.exports = router;
