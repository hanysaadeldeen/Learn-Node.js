const { required } = require("joi");
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      require: true,
      min: [1, "rating must be at least 1.0"],
      max: [5, "rating must be at moast 5.0"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name profilePhoto" });
  next();
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;
