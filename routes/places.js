const express = require('express')
const router = express.Router()
const Place = require('../models/place')

// View a single place route (when you have clicked on a specific entry)
router.get('/:slug', async(req, res) =>{
    try {
        const place = await place.findOne({ slug: req.params.slug })
        res.render('places/single',{
            place: place
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router