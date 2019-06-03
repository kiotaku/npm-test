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

app.get('/json-response', (req, res) => {
  res.send(JSON.stringify({ id: 1, name: 'My response' }))
})

app.post('/to-google', (req, res) => {
  res.redirect('https://google.fi/')
})

app.get('/not-gonna-find', (req, res) => {
  res.sendStatus(404)
})

app.get('/give-me-cookie', (req, res) => {
  res.cookie('for', 'you')
  res.send('OK')
})

app.delete('/cookie-for', (req, res) => {
  res.clearCookie('for')
  res.sendStatus(200)
})

const router = express.Router()
router.get('/path', (req, res) => {
  res.sendStatus(200)
})
app.use('/routed', router)

const isQueryParameterFooEqualsbar = (req, res, next) => {
  if (req.query.foo === 'bar') {
    next()
  } else {
    res.sendStatus(403)
  }
}

app.use('/check-query-parameter', isQueryParameterFooEqualsbar)
app.get('/check-query-parameter', (req, res) => {
  res.sendStatus(200)
})

const delay1secSendReqest = (req, res, next) => {
  setTimeout(() => {
    next()
  }, 1000)
}

app.use('/delay-request', delay1secSendReqest)
app.get('/delay-request', (req, res) => {
  res.sendStatus(200)
})

app.listen(3000)
