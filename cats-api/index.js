'use strict'

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = Promise
const app = express()

mongoose.connection(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
  console.log('Connected successfully.')
  app.listen(process.env.PORT)
}).catch(err => {
  console.log('Connection to db failed: ' + err)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})
