const express = require("express");
const router = express.Router();
const path = require("path");
const Product = require("../models/product");

// Should be able to delete... not sure why
////////////////////////////////////////////
const uploadPath = path.join("public", Product.coverImageBasePath);
const fs = require("fs");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const multer = require("multer");
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});
////////////////////////////////////////////

// Create a new product route
router.post(
  "/",

  // Should be able to delete... not sure why
  ////////////////////////////////////////////
  upload.single("cover"),
  ////////////////////////////////////////////

  async (req, res) => {
    // Should be able to delete... not sure why
    ////////////////////////////////////////////
    const fileName = req.file != null ? req.file.filename : null;
    ////////////////////////////////////////////

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      publishDate: new Date(req.body.publishDate),

      // Should be able to delete... not sure why
      ////////////////////////////////////////////
      coverImageName: "testing",
      ////////////////////////////////////////////
    });
    try {
      const newProduct = await product.save();
      res.redirect("/");
    } catch {
      console.log("Error: Unsuccessful in adding new item to the database");
    }
  }
);

// Should be able to delete... not sure why
////////////////////////////////////////////
function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.error(err);
  });
}
////////////////////////////////////////////

// Route to display the edit page for a selected item, using its slug
router.get("/:slug/edit", async (req, res) => {
  try {
    // Does it matter than we are using slug and not ID? what if there were items with duplicate names
    const product = await Product.findOne({ slug: req.params.slug });
    res.render("products/edit", {
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Route to update a selected item
router.put("/:id", async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    console.log(product);
    console.log(req.body.id);
    console.log(req.body.name);

    product.name = req.body.name;
    product.description = req.body.description;
    await product.save();
    res.redirect("/");
  } catch {
    if (product == null) {
      res.redirect("/");
    } else {
      res.render("products/single", {
        product: product,
      });
    }
  }
});

// Route to delete an item using its ID
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// New product route
router.get("/", (req, res) => {
  res.render("products/new", { product: new Product() });
});

module.exports = router;
