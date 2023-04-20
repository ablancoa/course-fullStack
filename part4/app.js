const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


module.exports = app