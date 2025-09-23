const path = require("path");

const asyncHandler = require("express-async-handler");

const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const AppError = require("../utils/AppError");
const ApiFeature = require("../utils/apiFeature");
const {
  uploadSingle,
  uploadImagesArray,
} = require("../middlewares/multerMiddleWare");

// upload BrandImg diskStorage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/brands");
//   },
//   filename: function (req, file, cb) {
//     const extention = file.mimetype.split("/")[1];
//     const fileName = `brand-${uuidv4()}-${Date.now()}-.${extention}`;
//     cb(null, fileName);
//   },
// });

// process with memoryStorage and Sharp
exports.ProcessImgGlobal = (imgType) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.file) return next();

    const filename = `${imgType}-${uuidv4()}-${Date.now()}.webp`;

    await sharp(req.file.buffer)
      .resize(600, 600)
      .webp({ quality: 70 })
      .toFile(path.join(`uploads/${imgType}`, filename));

    // attach filename to request body so controller can use it
    if (imgType !== "users") {
      req.body.image = filename;
    } else {
      req.body.profilePhoto = filename;
    }
    next();
  });
};

exports.ProcessingImgesFiles = () => {
  return asyncHandler(async (req, res, next) => {
    if (!req.files) return next();

    const imgCoverFilename = `products-cover-${uuidv4()}-${Date.now()}.webp`;
    await sharp(req.files.imgCover[0].buffer)
      .resize(600, 600)
      .webp({ quality: 70 })
      .toFile(path.join(`uploads/products`, imgCoverFilename));

    req.body.imgCover = imgCoverFilename;

    if (req.files.images) {
      const images = await Promise.all(
        req.files.images.map(async (file) => {
          const filename = `products-${uuidv4()}-${Date.now()}.webp`;
          await sharp(file.buffer)
            .resize(600, 600)
            .webp({ quality: 70 })
            .toFile(path.join(`uploads/products`, filename));
          return filename;
        })
      );
      req.body.images = images;
    }

    next();
  });
};
// for upload  Single Image
exports.UploadImgGlobal = uploadSingle("image");

// for upload fileds of Image
exports.UploadImagesfileds = uploadImagesArray([
  { name: "imgCover", maxCount: 1 },
  { name: "images", maxCount: 8 },
]);

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

    if (response && response.password) {
      response.password = undefined;
    }

    if (response.active || response.role) {
      response.active = undefined;
      response.role = undefined;
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
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const countDoc = await model.countDocuments();

    const apifeature = new ApiFeature(model.find(filter), req.query)
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
