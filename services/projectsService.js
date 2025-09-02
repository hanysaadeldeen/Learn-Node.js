const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const ProductsModel = require("../models/projectModels");
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

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ msg: `Invalid ID format: ${id}` });
  // }
  const project = await ProductsModel.findById(id);

  if (!project) {
    return res
      .status(404)
      .json({ msg: `"There is no Project With This ID"${id}` });
  }
  res.status(200).json({ data: project });
});
// @description create Projects
// @route       POST /api/v1/projects/
// @sccess      Private

// update fetch data to use async await
exports.createProjects = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { author } = req.body;
  const { images } = req.body;

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
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: `Invalid ID format: ${id}` });
  }

  const getProject = await ProductsModel.findById(id);
  if (!getProject) {
    return res.status(404).json({ msg: "this Project does not exist" });
  }

  const UpdatedProject = await ProductsModel.findByIdAndUpdate(
    { _id: id },
    { title },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json({ data: UpdatedProject.title, previewProjects: getProject.title });
});

// @description delete Projects
// @route    PUT /api/vi/projects/:id
// @access  Private

exports.deleteProjects = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: `Invalid ID format: ${id}` });
  }
  const deletedProject = await ProductsModel.findByIdAndDelete(id);

  if (!deletedProject) {
    return next(new AppError(`There is no Project With This ID:${id}`, 404));
  }
  res
    .status(204)
    .json({ data: { id: deletedProject.id, title: deletedProject.title } });
});
