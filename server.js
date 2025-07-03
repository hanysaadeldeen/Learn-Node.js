const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

// start geting the environment variables
dotenv.config({ path: ".env" });
const port = process.env.port;
const node_env = process.env.NODE_ENV;
const DBURI = process.env.DB_URI;

// for connect our database to our application
mongoose
  .connect(DBURI)
  .then((con) => {
    console.log("Connected to MongoDB", con.connection.host);
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
    process.exit();
  });

//   define express app
const app = express();

// use morgan for middleware
// في الجزء دا هوا ال بيحول الكود المبعوت من json to string to read it
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`"Server mode ${node_env}`);
}

// create scheme
const ProductsSchema = new mongoose.Schema({
  title: String,
  author: String,
});

// create model after schema
const productsModel = mongoose.model("Products", ProductsSchema);

// routews

app.post("/", (req, res) => {
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
});

// log this in the main Page /
app.get("/", (req, res) => {
  res.send("Hello, mohamed test");
});

// listen to your project
app.listen(port, () => {
  console.log(`"Server is running on port ${port}`);
});
