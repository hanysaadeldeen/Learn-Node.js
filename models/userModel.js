const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      minLength: [2, "user name must at least 2  charachter"],
      maxLength: [20, "user name must at most 20 charachter"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      minLength: [6, "phone number must be at least 6 characters"],
      maxLength: [15, "phone number must be at most 15 characters"],
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.profilePhoto) {
    const img = `${process.env.DOMAIN_URL}/users/${doc.profilePhoto}`;
    doc.profilePhoto = img;
  }
};

UserSchema.post("init", function (doc) {
  setImageURL(doc);
});
UserSchema.post("save", function (doc) {
  setImageURL(doc);
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
