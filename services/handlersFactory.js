const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

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
