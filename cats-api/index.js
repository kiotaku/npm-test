'use strict'

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Promise = Promise
const app = express()

const Cat = new Schema({
  name: String,
  dateOfBirth: { type: Date, max: Date.now() },
  gender: { type: String, enum: ['male', 'female'] },
  color: String,
  weight: Number
})

mongoose.connection(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
  console.log('Connected successfully.')
  app.listen(process.env.PORT)
}).catch(err => {
  console.log('Connection to db failed: ' + err)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
