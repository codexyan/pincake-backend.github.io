const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  response(200, "API v1 EJS Connected", "SUCCESS", res)
}) 

app.get('/mahasiswa', (req, res) => {
  const sql = "SELECT * FROM mahasiswa"
  db.query(sql, (err, fields) => {
    if(err) throw err  
    response(200, fields, "list mahasiswa muncul", res)
  })
})

app.get('/mahasiswa/:nim', (req, res) => {
  const nim = req.params.nim
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err, fields) => {
    if(err) throw err
    response(200, fields , "get detail mahasiswa", res)
  })
})

app.post('/mahasiswa', (req, res) => {
  const {nim, nama, email, kelas, jurusan} = req.body
  console.log(req.body)

  const sql =`INSERT INTO mahasiswa (nim, nama, email, kelas, jurusan) VALUES (${nim}, '${nama}', '${email}', '${kelas}', '${jurusan}')`
  db.query(sql, (err, fields) => {
    if(err) response(500, "invalid", "error", res)
    if(fields?.affectedRows){
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId
      }
      response(200, data, "Data Added Successfuly", res)
      console.log("Data successfuly Added on DB")
    }
  })

  // res.send("OK")
  // response(200, "Ini Posting", "Data Added Successfuly", res)
})

app.put('/mahasiswa', (req, res) => {
  const {nim, nama, email, kelas, jurusan} = req.body
  console.log(req.body)

  const sql = `UPDATE mahasiswa SET nama = '${nama}', email = '${email}', kelas = '${kelas}', jurusan = '${jurusan}' WHERE nim = '${nim}'`
  db.query(sql, (err, fields) => {
    if(err) response (500, "invalid", "error", res)
    if(fields?.affectedRows){
      const data = {
        isSuccess : fields.affectedRows,
        message: fields.message
      }
      response(200, data, "Successfuly Update data", res)
    } else {
      response(404, "user not found", "error", res)
    }
  })

})

app.delete('/mahasiswa', (req, res) => {
  const { nim } = req.body
  console.log(req.body)

  const sql =  `DELETE FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err, fields) => {
    if(err) response (500, "invalid", "error", res)
  
    if(fields?.affectedRows){
      const data = {
        isDeleted: fields.affectedRows
      }
      response(200, data, "Successfuly Deleted Data", res)
    } else {
      response(404, "User not found", "error", res)
    }
  })
  // res.send("Ini delete data")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})