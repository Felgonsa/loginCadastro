var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json()) // Middleware para analisar o corpo da requisição como JSON
app.use(express.json()) // Middleware para analisar o corpo da requisição como JSON


const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

/////////////


const pool = require('./db/db.js'); // Importa a pool de conexões do PostgreSQL



const controller = require('./controllers/controller.js') // Importa o controlador
app.use('/', controller)
