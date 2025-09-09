const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "category Title unique"],
      required: [true, "category name is required"],
      minLength: [3, "category min Length is 3"],
      maxLength: [50, "category max length is 50"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.DOMAIN_URL}/category/${doc.image}`;
    doc.image = imageUrl;
  }
};

categorySchema.post("init", function (doc) {
  setImageURL(doc);
});
categorySchema.post("save", function (doc) {
  setImageURL(doc);
});
const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
