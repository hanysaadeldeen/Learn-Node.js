const multer = require("multer");
const AppError = require("../utils/AppError");

exports.multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  } else if (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message || "Something went wrong with file upload",
    });
  }
  next();
};

exports.fileFilterImages = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("only images allowed", 404));
  }
};

const multerStorage = () => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage, fileFilter: exports.fileFilterImages });
  return upload;
};

exports.uploadSingle = (fieldType) => {
  return multerStorage().single(fieldType);
};

exports.uploadImagesArray = (arrayOfFields) => {
  return multerStorage().fields(arrayOfFields);
};
