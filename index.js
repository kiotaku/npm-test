const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log('ip: ', req.ip)
  console.log('query parameter(myParam): ', req.query.myParam)
  res.send(`ip: ${req.ip}, query parameter(myParam): ${req.query.myParam}`)
})

app.get('/path1/:param1', (req, res) => {
  console.log(req.params.param1)
  res.send(`path parameter(param1): ${req.params.param1}`)
})

app.get(['/path2', '/path3', '/path4'], (req, res) => {
  console.dir(req, { depth: 1 })
  res.send('OK')
})

app.listen(3000)
