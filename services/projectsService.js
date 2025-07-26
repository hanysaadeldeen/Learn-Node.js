const ProductsModel = require("../models/projectModels");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const mongoose = require("mongoose");
// @desc Get all projects
// @route GET /api/v1/projects/
// @access Public

exports.getProjects = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;

  const skip = (page - 1) * limit;

  const projects = await ProductsModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ results: projects.length, data: projects, page, limit });
});

// @desc get Specific Project
// @route Get /api/v1/projects/:id
// @access Public

exports.getSpecificProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: `Invalid ID format: ${id}` });
  }
  const project = await ProductsModel.findById(id);

  if (!project) {
    res.status(404).json({ msg: `"There is no Project With This ID"${id}` });
  }
  res.status(200).json({ data: project });
});
// @description create Projects
// @route       POST /api/v1/projects/
// @sccess      Private

// update fetch data to use async await
exports.createProjects = asyncHandler(async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const images = req.body.images;

  const projects = await ProductsModel.create({
    title,
    author,
    images,
    slug: slugify(title),
  });
  res.status(201).json({ data: projects });
});

// @description update Projects
// @route    PUT /api/vi/projects/:id
// @access  Private

exports.updateProjects = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const title = req.body.title;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: `Invalid ID format: ${id}` });
  }

  const getProject = await ProductsModel.findById(id);
  if (!getProject) {
    res.status(300).json({ data: "we can't find this project" });
  }

  const UpdatedProject = await ProductsModel.findByIdAndUpdate(
    id,
    { title },
    {
      new: true,
    }
  );

  res.status(200).json({ data: UpdatedProject, previewProjects: getProject });
});

// @description delete Projects
// @route    PUT /api/vi/projects/:id
// @access  Private

exports.deleteProjects = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: `Invalid ID format: ${id}` });
  }
  const deletedProject = await ProductsModel.findByIdAndDelete(id);

  if (!deletedProject) {
    res.status(404).json({ msg: `There is no Project With This ID:${id}` });
  }
  res
    .status(200)
    .json({ data: { id: deletedProject.id, title: deletedProject.title } });
});
