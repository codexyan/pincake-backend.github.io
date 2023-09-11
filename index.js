const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(200, "Express JS Connected", res)
}) 

app.get('/mahasiswa', (req, res) => {
  res.send("list mahasiswa muncul")
})

app.get('/mahasiswa/:nim', (req, res) => {
  const nim = req.params.nim
  res.send(`spesifik mahasiswa by nim : ${nim}`)
})

app.post('/mahasiswa', (req, res) => {
  res.send("Ini Posting")
})

app.put('/mahasiswa', (req, res) => {
  res.send("Ini put atau update data")
})

app.delete('/mahasiswa', (req, res) => {
  res.send("Ini delete data")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})