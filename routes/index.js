const express = require('express')
const router = express.Router()
const Place = require('../models/place')

router.get('/', async (req, res) =>{
    try {
        // Limits the number of entries returned and the order
        const places = await Place.find({}).sort({publishDate: 'desc'}).limit(100).exec()
        res.render('index', {places: places})
    } catch{
        res.redirect('/')
    }
})

module.exports = router