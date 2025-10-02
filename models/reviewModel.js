const ProductModel = require("./ProductModel.js");
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

ReviewSchema.statics.countAverageOnProduct = async function (productId) {
  const stats = await this.aggregate([
    // Stage 1 : get all reviews in specific product
    { $match: { product: productId } },
    // Stage 2: Grouping reviews based on productID and calc avgRatings, ratingsQuantity
    {
      $group: {
        _id: "$product",
        ratingCount: { $sum: 1 },
        ratingAverage: { $avg: "$rating" },
      },
    },
  ]);

  console.log(stats);
  if (stats.length > 0) {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingCount: stats[0].ratingCount,
      ratingAverage: stats[0].ratingAverage,
    });
  } else {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingCount: stats[0].ratingCount,
      ratingAverage: Math.round(stats[0].ratingAverage),
    });
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.countAverageOnProduct(this.product);
});
ReviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) await doc.constructor.countAverageOnProduct(doc.product);
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;
