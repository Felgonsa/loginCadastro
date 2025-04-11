const express = require('express')
const router = express.Router()
const { cadastrar, logar } = require('../controllers/authController')

// rota de cadastro
router.post('/cadastro', cadastrar)

// rota de login
router.post('/login', logar)

module.exports = router
