const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// Default route for the main index page
router.get('/', async (req, res) =>{
    try {
        // Limit the number of returned items and their order
        const products = await Product.find({}).sort({publishDate: 'desc'}).limit(100).exec()
        res.render('index', {products: products})
    } catch{
        res.redirect('/')
    }
})
module.exports = router