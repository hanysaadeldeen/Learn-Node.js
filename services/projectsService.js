const productsModel = require("../models/projectModels");
exports.getProjects = (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  console.log("req body", req.body);
  console.log("title", title);
  console.log("author", author);

  const newProduct = new productsModel({ title, author });

  newProduct
    .save()
    .then((docs) => {
      res.json(docs);
    })
    .catch((error) => {
      res.json(error);
    });
};
