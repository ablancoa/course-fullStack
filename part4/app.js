const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const cors = require('cors')
const app = express()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


module.exports = app