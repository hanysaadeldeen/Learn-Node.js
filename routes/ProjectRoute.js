const express = require("express");
const {
  getProjects,
  createProjects,
  getSpecificProject,
  updateProjects,
  deleteProjects,
} = require("../services/projectsService");
const router = express.Router();

// router.get("/", getProjects);
// router.post("/", createProjects);
router.route("/").get(getProjects).post(createProjects);
router.route("/:id").get(getSpecificProject);
router.route("/:id").put(updateProjects);
router.route("/:id").delete(deleteProjects);
module.exports = router;
