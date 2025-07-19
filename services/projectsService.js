const ProductsModel = require("../models/projectModels");
const slugify = require("slugify");
exports.getProjects = (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  console.log("req body", req.body);
  console.log("title", title);
  const getProduct = new ProductsModel({ title });
  getProduct
    .save()
    .then((docs) => {
      res.json(docs);
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.createProjects = (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const images = req.body.images;

  ProductsModel.create({
    title,
    author,
    images,
    slug: slugify(title),
  })
    .then((projects) => res.status(200).json({ data: projects }))
    .catch((error) => res.status(400).send(error));
};
