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

// View single item route (i.e. when you click on an item in the list -> /products/:slug)
router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.render("products/single", {
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
module.exports = router;
