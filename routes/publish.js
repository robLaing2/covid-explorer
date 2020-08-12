const express = require('express')
const router = express.Router()
const Place = require('../models/place')

// Create place route - NOT WORKING AND CANT SEE WHY
router.post('/', async (req, res)=>{
    //const fileName = req.file != null ? req.file.filename : null
    const place = new Place({
        name: req.body.name,
        description: req.body.description,
        publishDate: new Date(req.body.publishDate)
    })
    try {
        const newPlace = await place.save()
        res.redirect('/')
    } catch (error) {
        console.log('Error: place not inserted into mongodb')  
    }
})

// Route to display an edit place page
router.get('/:slug/edit', async(req, res)=>{
    try {
        const place = await Place.findOne({ slug: req.params.slug })
        res.render('places/edit',{
            place: place
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// Route to update the item
router.put('/:id', async(req, res)=>{
    let place 
    try {
        place = await Place.findById(req.params.id)
        console.log(place)
        console.log(req.body.id)
        console.log(req.body.name)
        
        place.name = req.body.name
        place.description = req.body.description
        await place.save()
        // currently redirects to home
        res.redirect('/')
    } catch {
        if(place == null){
            res.redirect('/')
        }else{
            res.render('places/single',{
                place: place
            })
        }
    }
})

// Route to delete an item
router.delete('/:id', async(req, res)=>{
    await Place.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router