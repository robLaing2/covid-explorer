require('dotenv').config()

const express = require('express')
const app = express()

const methodOverride = require('method-override')

const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const publishRouter = require('./routes/publish')
const placesRouter = require('./routes/places')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

// tell express where our static files will be, i.e. html, css, static images
app.use(express.static('public'))

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true 
})

app.use(methodOverride('_method'))


const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('Connected to mongoose'))

app.use('/', indexRouter)
app.use('/publish', publishRouter)
app.use('/places', placesRouter)


app.listen(process.env.PORT || 3000)