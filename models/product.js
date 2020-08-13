const mongoose = require("mongoose");
const slugify = require("slugify");

// Should be able to delete... not sure why
////////////////////////////////////////////
const path = require("path");
const coverImageBasePath = "uploads/bookCover";
////////////////////////////////////////////

// Schema is used to define the structure of documents within a mongodb collection
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
});

// Should be able to delete... not sure why
////////////////////////////////////////////
// This function (function), will run before we do validation on the article, each time
productSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});
////////////////////////////////////////////

// Export the schema to be used when interacting with the database
module.exports = mongoose.model("Product", productSchema);

// Should be able to delete... not sure why
////////////////////////////////////////////
module.exports.coverImageBasePath = coverImageBasePath;
////////////////////////////////////////////
