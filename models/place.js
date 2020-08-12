const mongoose = require('mongoose')
const slugify = require('slugify')

// Create a Schema - defines format of the database entry
const placeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    publishDate:{
        type: Date,
        required: false
    },
    slug:{
        type: String,
        unique: true,
        required: false
    }
})

// (function) will run before we do validation on the article, each time
// A slug is a shortened version of the name that fits in a URL
placeSchema.pre('validate', function(next){
    if(this.name){
        this.slug = slugify(this.name, {
            lower: true, 
            strict: true})
    }
    next()
})

module.exports = mongoose.model('Place', placeSchema)
