const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

// routes / URL / endpoint utama dengan method GET
app.get('/', (req, res) => {
  db.query("SELECT * FROM mahasiswa", (error, result) => {
    // hasil data dari mysql
    response(200, result, "get all data from mahasiswa", res)
  })
}) 

app.get('/find', (req, res) => {
  const sql = `SELECT nama FROM mahasiswa WHERE nim = ${req.query.nim}`
  db.query(sql, (error, result) => {
    response(200, result, "find mahasiswa name", res)
  })

  // console.log({ urlParam : request.query })
  // response.send('Halo Dunia!')
})

app.post('/login', (request, response) => {
  console.log({ requestFromOutside : request.body })
  console.log({ requestFromOutside : request.body.username })
  console.log({ requestFromOutside : request.body.password })
  response.send('Login berhasil!')
})

app.put('/username', (request, response) => {
  console.log({ updateData: request.body })
  response.send('update berhasil yeayyy!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})