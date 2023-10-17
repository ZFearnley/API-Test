const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const app = express()

//const students = require('./routes/students')

app.use(notFound)
app.use(errorHandler)

module.exports = app