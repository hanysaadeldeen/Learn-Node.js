const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const AppError = require("../utils/AppError");
const ApiFeature = require("../utils/apiFeature");

exports.DeleteDoc = (model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const response = await model.findByIdAndDelete(id);
    if (!response) {
      return next(res.status(404).json({ message: "Document not found" }));
    }
    res.status(209).json({ message: "Deleted Successfully" });
  });
};

exports.UpdateDoc = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body) {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      } else if (req.body.name) {
        req.body.slug = slugify(req.body.name);
      }
    }
    const response = await model.findByIdAndUpdate(id, req.body, { new: true });
    if (!response) {
      return next(res.status(404).json({ message: "Document not found" }));
    }
    res.status(200).json({ status: "success", data: response });
  });

exports.GetSpecificDoc = (model, options = {}) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let response;

    // لو محدد field → هجيب list بالـ field
    if (options.field) {
      response = await model.find({ [options.field]: id });

      if (options.populate) {
        response = await model
          .find({ [options.field]: id })
          .populate(options.populate);
      }

      if (!response || response.length === 0) {
        return next(
          new AppError(`no documents found with ${options.field} = ${id}`, 404)
        );
      }

      return res.status(200).json({ length: response.length, data: response });
    }

    // get by id
    response = await model.findById(id);

    if (!response) {
      return next(new AppError(`no document found with id = ${id}`, 404));
    }

    res.status(200).json({ status: "success", data: response });
  });
};

exports.CreateDoc = (model) => {
  return asyncHandler(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    else if (req.body.name) req.body.slug = slugify(req.body.name);

    const response = await model.create(req.body);

    res.status(201).json({ status: "success", data: response });
  });
};

exports.GetDocs = (model, type) => {
  return asyncHandler(async (req, res) => {
    const countDoc = await model.countDocuments();

    const apifeature = new ApiFeature(model.find(), req.query)
      .search(type)
      .paginate(countDoc)
      .filter()
      .sort()
      .fields();

    const { query, paginationResult } = apifeature;
    const response = await query;
    res.status(200).json({
      status: "success",
      length: response.length,
      paginationResult,
      data: response,
    });
  });
};
