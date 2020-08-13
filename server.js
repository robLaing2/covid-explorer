require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Lets you use HTTP verbs i.e. PUT, DELETE in places where the client doesn't support it
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// EJS is a simple template lang that lets you generate HTML markup with js
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')

// body-parser extracts the entire body portion of an incoming request stream
// and exposes it on req.body as something easier to interface with
const bodyParser = require('body-parser')

// Require routers from routes folder
const indexRouter = require('./routes/index')
const publishRouter = require('./routes/publish')
const productsRouter = require('./routes/products')

app.set('views', __dirname + '/views')
app.set('layout', 'layout')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

// Use the routes introduced above
app.use('/', indexRouter)
app.use('/publish', publishRouter)
app.use('/products', productsRouter)

//tell express where our static files will be, i.e. html, css, static images
app.use(express.static('public'))

// connect to db using URL in .env file
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true 
})

// Mongoose is the lib for mongoDB and node.js
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('Connected to mongoose'))

// Can use environment PORT if deployed i.e. on heroku, else use 3000
app.listen(process.env.PORT || 3000)