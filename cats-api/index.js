'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Promise = Promise
const app = express()

const CatSchema = new Schema({
  name: String,
  dateOfBirth: { type: Date, max: Date.now() },
  gender: { type: String, enum: ['male', 'female'] },
  color: String,
  weight: Number
})

const Cat = mongoose.model('Cat', CatSchema)

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
  console.log('Connected successfully.')
  app.listen(process.env.PORT)
}).catch(err => {
  console.log('Connection to db failed: ' + err)
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cats', (req, res) => {
  Cat.find().then(cats => {
    res.send(cats)
  })
})

app.post('/cats', (req, res) => {
  const { name, dateOfBirth, gender, color, weight } = req.body
  Cat.create({
    name,
    dateOfBirth: new Date(dateOfBirth).getTime(),
    gender,
    color,
    weight
  }).then(cat => {
    res.send(cat)
  })
})
