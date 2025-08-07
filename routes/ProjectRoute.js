const express = require("express");
const {
  getProjects,
  createProjects,
  getSpecificProject,
  updateProjects,
  deleteProjects,
} = require("../services/projectsService");

const {
  getProjectValidator,
  updateAndDeleteProjectValidator,
  createProjectValidator,
} = require("../utils/Validator/projectValidator");

const router = express.Router();

// router.get("/", getProjects);
// router.post("/", createProjects);
router.route("/").get(getProjects).post(createProjectValidator, createProjects);
router.route("/:id").get(getProjectValidator, getSpecificProject);
router.route("/:id").put(updateAndDeleteProjectValidator, updateProjects);
router.route("/:id").delete(updateAndDeleteProjectValidator, deleteProjects);
module.exports = router;
