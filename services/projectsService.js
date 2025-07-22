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

  // ProductsModel.create({
  //   title,
  //   author,
  //   images,
  //   slug: slugify(title),
  // })
  //   .then((projects) => res.status(200).json({ data: projects }))
  //   .catch((error) => res.status(400).send(error));

  // use  express-async-handler
  // for Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

  const projects = await ProductsModel.create({
    title,
    author,
    images,
    slug: slugify(title),
  });
  res.status(201).json({ data: projects });
});
